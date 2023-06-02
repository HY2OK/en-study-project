import React from 'react';
import Auth from '../../hoc/auth';
import {useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';

import letterImg from '../../assets/img/letterLogo.png';
import style from './MainPage.module.css';

function MainPage() {
    const navigate = useNavigate();

    return (
        <motion.div className={`${style.container}`} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div className={`${style.header}`}>
                <div>
                    <img src={letterImg} alt="" onClick={() => navigate('/main')} />
                    Good at enGlish with Gpt
                </div>
            </div>
            <div className={`${style.content}`}>
                <ul>
                    <li onClick={() => navigate('/word')}>
                        <div></div>Today's Word
                    </li>
                    <li onClick={() => navigate('/roleprev')}>
                        <div></div>Today's Role Playing
                    </li>
                    <li onClick={() => navigate('/diaryList')}>
                        <div></div>Today's Diary
                    </li>
                    <li onClick={() => navigate('/mypage')}>
                        <div></div>My Page
                    </li>
                </ul>
            </div>
        </motion.div>
    );
}

export default Auth(MainPage, true);
