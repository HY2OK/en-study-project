import React from 'react';
import Auth from '../../hoc/auth';
import s from './InitialPage.module.css';
import logoImg from '../../assets/img/logo.png';
import {useNavigate} from 'react-router-dom';

// className={`${s.}`}
function InitialPage() {
    const navigate = useNavigate();

    const imgClick = () => {
        navigate('/');
    };
    return (
        <div className={`${s.container}`}>
            <div className={`${s.circle}`}></div>
            <div className={`${s.box}`}></div>
            <div className={`${s.tri}`}></div>

            <div className={`${s.content}`}>
                <div className={`${s.logo}`}>
                    <img src={logoImg} alt="" onClick={imgClick} />
                    <span>Good at enGlish with Gpt</span>
                </div>
                <div className={`${s.h1}`}>Hello Welcome to our site</div>
                <div className={`${s.h1}`}>Then shall we start English</div>

                <div className={`${s.btns}`}>
                    <button className={`${s.btn}`} onClick={() => navigate('/login')}>
                        <div className={`${s.b1}`}></div>Login
                    </button>
                    <button className={`${s.btn}`} onClick={() => navigate('/register')}>
                        <div className={`${s.b2}`}></div>Register
                    </button>
                </div>
            </div>

            <div className={`${s.circle2}`}></div>
            <div className={`${s.box2}`}></div>
        </div>
    );
}

export default Auth(InitialPage, false);
