import React from 'react';
import Auth from '../../hoc/auth';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import {motion} from 'framer-motion';

import letterImg from '../../assets/img/letterLogo.png';
import style from './MainPage.module.css';

function MainPage() {
    const {users} = useSelector(state => state.user);

    console.log(users);
    const navigate = useNavigate();

    const logoutClick = () => {
        axios.get('/api/users/logout').then(res => {
            if (res.data.success) {
                cookie.remove('login_token');
                navigate('/');
            } else {
                alert('로그아웃에 실패하였습니다.');
            }
        });
    };

    return (
        <motion.div className={`${style.container}`} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div className={`${style.header}`}>
                <div>
                    <img src={letterImg} alt="" onClick={() => navigate('/main')} />
                    Good at enGlish with Gpt
                </div>
            </div>
            <button type="button" className={`${style.logoutBtn}`} onClick={logoutClick}>
                logout
            </button>
            <div className={`${style.content}`}>
                <ul>
                    <li onClick={() => navigate('/main')}>
                        <div></div>Today's Word
                    </li>
                    <li onClick={() => navigate('/main')}>
                        <div></div>Today's Role Playing
                    </li>
                    <li onClick={() => navigate('/main')}>
                        <div></div>Today's Diary
                    </li>
                    <li onClick={() => navigate('/main')}>
                        <div></div>My Page
                    </li>
                </ul>
            </div>
        </motion.div>
    );
}

export default Auth(MainPage, true);
// export default MainPage;
