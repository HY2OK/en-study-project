import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {delWord, getWord} from '../../../features/word/wordSlice';
import styles from './UnknownPage.module.css';
import {AiOutlineArrowLeft} from 'react-icons/ai';
import {BsTrash} from 'react-icons/bs';

function UnknownPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let {userId} = useParams();
    const [isHovering, setIsHovering] = useState(false);
    const [words, setWords] = useState([]);

    useEffect(() => {
        let body = {
            userId,
        };

        dispatch(getWord(body)).then(res => {
            setWords(res.payload.words);
        });
    }, []);

    const showCartHandler = index => {
        setIsHovering(index);
    };

    const hideCartHandler = () => {
        setIsHovering(-1);
    };

    const onClickDel = word => {
        console.log(userId);
        console.log(word);

        let body = {
            userId: userId,
            word: word.trim(),
        };

        dispatch(delWord(body)).then(res => {
            alert('삭제 완료');
            window.location.replace(`/word/${userId}`);
        });
    };

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
                                <div
                                    key={index}
                                    className={styles.word}
                                    onMouseLeave={hideCartHandler}
                                    onMouseEnter={() => showCartHandler(index)}
                                >
                                    {words && ele.word} <span>{words && ele.mean}</span>
                                    <BsTrash
                                        className={styles.trash}
                                        display={isHovering === index ? 'block' : 'none'}
                                        onClick={() => onClickDel(ele.word)}
                                    />
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
