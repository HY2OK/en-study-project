import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import styles from './DiaryListPage.module.css';
import {useDispatch} from 'react-redux';
import {authUser} from '../../../features/user/userSlice';
import {diaryGet} from '../../../features/diary/diarySlice';
import {AiOutlineClose} from 'react-icons/ai';
import {BsFillPlusCircleFill} from 'react-icons/bs';

function DiaryListPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [diary, setDiary] = useState([]);
    const [id, setId] = useState('');

    useEffect(() => {
        dispatch(authUser()).then(res => {
            let data = {
                userId: res.payload._id,
            };
            setId(res.payload._id);
            dispatch(diaryGet(data)).then(res => {
                setDiary(state => [...state, ...res.payload.info]);
            });
        });
    }, []);

    return (
        <motion.div className={`${styles.container}`} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <AiOutlineClose onClick={() => navigate('/main')} />
                    My Diary
                </div>
                <div className={styles.list}>
                    {diary.length === 0 ? (
                        <div className={styles.spinner}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    ) : (
                        diary.map((e, index) => (
                            <div className={styles.date} onClick={() => navigate(`/diaryList/${id}/${index}`)} key={index}>
                                {e.updatedAt.substr(0, 10)}
                            </div>
                        ))
                    )}
                </div>
                <div className={styles.footer}>
                    <button onClick={() => navigate('/diary')}>
                        <BsFillPlusCircleFill />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default DiaryListPage;
