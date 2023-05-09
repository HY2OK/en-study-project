import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {getWord} from '../../../features/word/wordSlice';
import styles from './UnknownPage.module.css';
import {AiOutlineArrowLeft} from 'react-icons/ai';

function UnknownPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let {userId} = useParams();
    const [words, setWords] = useState([]);

    useEffect(() => {
        let body = {
            userId,
        };

        dispatch(getWord(body)).then(res => {
            setWords(res.payload.words);
        });
    }, []);

    return (
        <motion.div className={styles.background} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div
                        className={styles.backBtn}
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <AiOutlineArrowLeft />
                    </div>
                    <div className={styles.list}>List</div>
                </div>

                <div className={styles.main}>
                    {words.length === 0 ? (
                        <div className={styles.ring}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    ) : (
                        words.map((ele, index) => {
                            return (
                                <div key={index} className={styles.word}>
                                    {words && ele.word} <span>{words && ele.mean}</span>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default UnknownPage;
