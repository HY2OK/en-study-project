import React from 'react';
import Auth from '../../hoc/auth';
import style from './InitialPage.module.css';
import logoImg from '../../assets/img/logo.png';
import {useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';

function InitialPage() {
    const navigate = useNavigate();

    const imgClick = () => {
        navigate('/');
    };
    return (
        <motion.div className={`${style.container}`} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div className={`${style.circle}`}></div>
            <div className={`${style.box}`}></div>
            <div className={`${style.tri}`}></div>

            <div className={`${style.content}`}>
                <div className={`${style.logo}`}>
                    <img src={logoImg} alt="" onClick={imgClick} />
                    <span>Good at enGlish with Gpt</span>
                </div>
                <div className={`${style.h1}`}>Hello Welcome to our site</div>
                <div className={`${style.h1}`}>Then shall we start English</div>

                <div className={`${style.btns}`}>
                    <button className={`${style.btn}`} onClick={() => navigate('/login')}>
                        <div className={`${style.b1}`}></div>Login
                    </button>
                    <button className={`${style.btn}`} onClick={() => navigate('/register')}>
                        <div className={`${style.b2}`}></div>Register
                    </button>
                </div>
            </div>

            <div className={`${style.circle2}`}></div>
            <div className={`${style.box2}`}></div>
        </motion.div>
    );
}

export default Auth(InitialPage, false);
