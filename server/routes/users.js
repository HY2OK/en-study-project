import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', (req, res) => {
    // 회원 가입 할 때 필요한 정보들을 client에서 가져오기
    const user = new User(req.body);

    user.save((err, userInfo) => {
        if (err) return res.json({success: false, err});
        return res.status(200).json({success: true, userInfo});
    });
    // 회원 정보 데이터 베이스에 넣기
});

router.post('/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에서 찾음
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: '제공된 이메일에 해당하는 유저가 없습니다',
            });
        }
        // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({loginSuccess: false, message: '비밀번호가 틀렸습니다.'});

            // 비밀번호 까지 맞다면 토큰을 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).json({message: '토큰 생성 실패'});

                // 토큰을 저장d
                res.cookie('login_token', user.token).status(200).json({loginSuccess: true, userId: user._id});
            });
        });
    });
});

router.get('/auth', auth, (req, res) => {
    // auth 미들웨어 통과 -> auth가 true
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
    });
});

router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ''}, (err, user) => {
        if (err) return res.json({success: false, err});
        return res.status(200).send({success: true});
    });
});

export default router;
