import React, {useEffect} from 'react';
import {motion} from 'framer-motion';
import styles from './MyPage.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {authUser} from '../../features/user/userSlice';
import {useNavigate} from 'react-router-dom';

import axios from 'axios';
import cookie from 'react-cookies';

import {BsCalendarCheck, BsListCheck, BsFillJournalBookmarkFill} from 'react-icons/bs';
import {AiOutlineArrowLeft, AiFillSetting} from 'react-icons/ai';

function MyPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {users} = useSelector(state => state.user);

    useEffect(() => {
        dispatch(authUser());
    }, []);

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
        <motion.div className={`${styles.container}`} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div className={`${styles.content}`}>
                <div className={styles.header}>
                    <AiOutlineArrowLeft onClick={() => navigate('/main')} />
                    MyPage
                </div>
                <div className={styles.user}>
                    <div className={styles.userInfo}>
                        <div className={styles.img}>
                            <img
                                src="https://images.generated.photos/ZsNhxZq_0f2MWbLKNFmcjT7WHsYGo-HJlRzQ5lH1mg0/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/Mjc1NzkzLmpwZw.jpg"
                                alt=""
                                width="20px"
                            />
                        </div>
                        <div>
                            <label>E-mail</label>
                            <div>{users && users.email}</div>
                            <label>NickName</label>
                            <div>{users && users.name}</div>
                        </div>
                    </div>
                    <div className={styles.goals}>
                        My Goals
                        <div>
                            <div></div>
                            <span>45%</span>
                        </div>
                    </div>
                </div>
                <div className={styles.tab}>
                    <ul>
                        <li>
                            <BsCalendarCheck />
                            Attendance
                        </li>
                        <li>
                            <BsListCheck />
                            Words List
                        </li>
                        <li>
                            <BsFillJournalBookmarkFill />
                            Diary List
                        </li>
                        <li>
                            <AiFillSetting />
                            Setting
                        </li>
                    </ul>
                </div>
                <div className={styles.footer}>
                    <div>
                        <button onClick={logoutClick} className={styles.customBtn}>
                            LOGOUT
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default MyPage;
