import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../features/user/userSlice';
import {useNavigate} from 'react-router-dom';
import Auth from '../../hoc/auth';
import {motion} from 'framer-motion';

import {AiOutlineArrowRight} from 'react-icons/ai';
import logoImg from '../../assets/img/logo.png';
import style from './LoginPage.module.css';

function LoginPage(props) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const {email, password} = formData;

    const onSubmitHandler = e => {
        e.preventDefault();

        let body = {
            email,
            password,
        };

        dispatch(loginUser(body)).then(res => {
            if (res.payload.loginSuccess) {
                navigate('/main');
            } else {
                alert('로그인 실패');
            }
        });
    };

    return (
        <motion.div className={`${style.container}`} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div className={`${style.box}`}></div>
            <div className={`${style.circle}`}></div>

            <div className={`${style.login}`}>
                <div className={`${style.logo}`}>
                    <img src={logoImg} alt="" onClick={() => navigate('/')} />
                </div>

                <div className={`${style.title}`}>Welcome Back!</div>
                <form className={`${style.form}`} onSubmit={onSubmitHandler}>
                    <div className={`${style.email}`}>
                        <label>E-mail</label>
                        <input type="email" name="email" value={email} onChange={onChange} required />
                    </div>
                    <div className={`${style.password}`}>
                        <label>Password</label>
                        <input type="password" name="password" value={password} onChange={onChange} required />
                    </div>
                    <button type="submit">
                        <div>
                            <AiOutlineArrowRight />
                        </div>
                    </button>
                </form>
                <div className={`${style.ques}`}>
                    Don't have an account? <span onClick={() => navigate('/register')}>Sign up</span>
                </div>
            </div>

            <div className={`${style.box2}`}></div>
            <div className={`${style.circle2}`}></div>
            <div className={`${style.tri2}`}></div>
        </motion.div>
    );
}

export default Auth(LoginPage, false);
