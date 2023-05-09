import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import WordModal from './WordModal/WordModal';
import {useDispatch, useSelector} from 'react-redux';
import {getFiveWords, uploadWord} from '../../features/word/wordSlice';
import {authUser} from '../../features/user/userSlice';
import {AiOutlineClose, AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineCheck} from 'react-icons/ai';
import {BsFillFileEarmarkWordFill} from 'react-icons/bs';
import {HiMagnifyingGlass} from 'react-icons/hi2';

import styles from './WordPage.module.css';
import {useNavigate} from 'react-router-dom';

function WordPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const word = useSelector(state => state.word);
    const {users} = useSelector(state => state.user);
    const [resultWord, setResultWord] = useState([]);
    const [render, setRender] = useState({});
    const [save, setSave] = useState(false);
    const [page, setPage] = useState(0);
    const [hidden, setHidden] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(authUser()).then(res => {
            let body = {
                userId: res.payload._id,
            };
            dispatch(getFiveWords(body)).then(res => {
                if (!res.payload) return;
                setRender(res.payload[0]);
                setResultWord(res.payload);
            });
        });
    }, []);

    const showModal = () => {
        setModalOpen(true);
    };

    const onClickNext = () => {
        setHidden(false);
        let num = page;
        num++;
        const change = resultWord[num];
        setPage(num);
        setRender(change);
    };

    const onClickPrev = () => {
        setHidden(false);
        let num = page;
        num--;
        const change = resultWord[num];
        setPage(num);
        setRender(change);
    };

    const onClickYes = () => {
        if (page === 4) return;
        onClickNext();
    };

    const onClickNo = () => {
        const {word, mean} = render;
        let body = {
            userId: users._id,
            word,
            mean,
        };

        dispatch(uploadWord(body)).then(res => {
            if (res.payload === 201) {
                alert('이미 저장한 단어입니다.');
                return;
            }
            setSave(true);
            setTimeout(() => {
                setSave(false);
            }, 1000);
        });
    };

    const onClickUnknown = () => {
        navigate(`/word/${users._id}`);
    };

    return (
        <motion.div className={styles.back} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            {/* 모달창 */}
            {modalOpen && <WordModal setModalOpen={setModalOpen} />}
            {/* 모달창 */}
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.x} onClick={() => navigate('/main')}>
                        <AiOutlineClose />
                    </div>
                    <span>
                        Word {page + 1} / {resultWord.length}
                    </span>
                    <div className={styles.modal}>
                        <button onClick={showModal}>
                            <HiMagnifyingGlass />
                        </button>
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.textBox}>
                        Do you know the meaning <br /> of the word?
                    </div>
                    <div className={styles.mainBox}>
                        {page === 0 ? (
                            <button onClick={onClickPrev} disabled={true}>
                                <AiOutlineDoubleLeft />
                            </button>
                        ) : (
                            <button onClick={onClickPrev}>
                                <AiOutlineDoubleLeft />
                            </button>
                        )}

                        {/* 단어 렌더링 */}
                        {resultWord.length === 0 ? (
                            <div className={styles.ellipsis}>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        ) : (
                            <div className={styles.word} onClick={() => setHidden(state => !state)}>
                                {render && render.word}
                                {hidden ? (
                                    <div className={styles.mean}>{render && render.mean}</div>
                                ) : (
                                    <div className={`${styles.mean} ${styles.hidden}`}>{render && render.mean}</div>
                                )}
                            </div>
                        )}
                        {/* 단어 렌더링 */}

                        {page === 4 ? (
                            <button onClick={onClickNext} disabled={true}>
                                <AiOutlineDoubleRight />
                            </button>
                        ) : (
                            <button onClick={onClickNext}>
                                <AiOutlineDoubleRight />
                            </button>
                        )}

                        {save ? (
                            <div className={styles.saving}>
                                <AiOutlineCheck />
                                Your word has been updated..
                            </div>
                        ) : null}
                    </div>
                    <div className={styles.chekcBtns}>
                        <button onClick={onClickNo}>
                            <div></div>No
                        </button>
                        <button onClick={onClickYes}>
                            <div></div>Yes
                        </button>
                    </div>
                    <div className={styles.footer} onClick={onClickUnknown}>
                        <BsFillFileEarmarkWordFill />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default WordPage;
