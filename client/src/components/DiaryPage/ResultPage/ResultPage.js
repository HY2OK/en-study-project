import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {diaryGet} from '../../../features/diary/diarySlice';
import {AiOutlineArrowLeft, AiOutlineArrowDown} from 'react-icons/ai';

import {motion} from 'framer-motion';
import styles from './ResultPage.module.css';

function ResultPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let {userId, index} = useParams();
    const [diary, setDiary] = useState({});
    const [arr, setArr] = useState([]);

    useEffect(() => {
        let data = {userId: userId};

        dispatch(diaryGet(data)).then(res => {
            const result = res.payload.info[index];
            setDiary({...result});

            let change = [];
            result.updated.forEach((e, index) => {
                if (typeof e === 'string') {
                    change[index] = `${e}`;
                } else {
                    change[index] = <span key={index}>{e.props.children[0]} </span>;
                }
            });

            setArr(change);
        });
    }, []);

    return (
        <motion.div className={`${styles.container}`} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <AiOutlineArrowLeft onClick={() => navigate('/diaryList')} />
                    {diary.updatedAt && diary.updatedAt.substr(5, 5)}
                </div>
                <div className={styles.main}>
                    <div className={styles.diary}>{diary.diary && diary.diary}</div>
                    <AiOutlineArrowDown />
                    <div className={styles.update}>{arr}</div>
                </div>
            </div>
        </motion.div>
    );
}

export default ResultPage;
