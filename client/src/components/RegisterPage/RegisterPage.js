import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../../features/user/userSlice';
import {useNavigate} from 'react-router-dom';
import Auth from '../../hoc/auth';
import {motion} from 'framer-motion';

import style from './RegisterPage.module.css';
import {AiOutlineArrowRight} from 'react-icons/ai';
import logoImg from '../../assets/img/logo.png';

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const {name, email, password, confirmPassword} = formData;

    const onSubmitHandler = e => {
        e.preventDefault();

        let body = {
            name,
            email,
            password,
        };

        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        dispatch(registerUser(body)).then(res => {
            console.log(res);
            if (res.payload.success) {
                navigate('/login');
            } else {
                alert('회원가입 실패');
            }
        });
    };

    return (
        <motion.div className={`${style.container}`} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div className={`${style.box}`}></div>
            <div className={`${style.circle}`}></div>

            <div className={`${style.register}`}>
                <div className={`${style.logo}`}>
                    <img src={logoImg} alt="" onClick={() => navigate('/')} />
                </div>

                <div className={`${style.title}`}>Let's Start!</div>
                <form className={`${style.form}`} onSubmit={onSubmitHandler}>
                    <div className={`${style.email}`}>
                        <label>User Name</label>
                        <input type="text" name="name" value={name} onChange={onChange} />
                    </div>
                    <div className={`${style.email}`}>
                        <label>E-mail</label>
                        <input type="email" name="email" value={email} onChange={onChange} />
                    </div>
                    <div className={`${style.password}`}>
                        <label>Password</label>
                        <input type="password" name="password" value={password} onChange={onChange} />
                    </div>
                    <div className={`${style.password}`}>
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} />
                    </div>
                    <button type="submit">
                        <div>
                            <AiOutlineArrowRight />
                        </div>
                    </button>
                </form>
                <div className={`${style.ques}`}>
                    Already have an account? <span onClick={() => navigate('/login')}>Sign in</span>
                </div>
            </div>

            <div className={`${style.box2}`}></div>
            <div className={`${style.circle2}`}></div>
            <div className={`${style.tri2}`}></div>
        </motion.div>
    );
}

export default Auth(RegisterPage, false);
