import {useEffect, useRef, useState} from 'react';
import styles from './WordModal.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {motion} from 'framer-motion';
import {getFiveWords, uploadFiveWords, wordQuiz} from '../../../features/word/wordSlice';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import {HiMagnifyingGlass} from 'react-icons/hi2';
import {useNavigate} from 'react-router-dom';

function WordModal({setModalOpen}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {users} = useSelector(state => state.user);

    const modalRef = useRef();

    const closeModal = () => {
        setModalOpen(false);
    };

    const [quiz, setQuiz] = useState({
        subject: '',
        level: '',
    });

    const {subject, level} = quiz;

    useEffect(() => {
        const handler = e => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        };
    });

    const onCheckEnter = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleChange = e => {
        setQuiz({...quiz, [e.target.name]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();

        const {subject, level} = quiz;

        let body = [
            {
                role: 'user',
                content: "'학교'에 관련된 toeic 시험에 자주 나오는 어휘들로 5개만 추천을 해줄래? 답변에 영어 단어와 한글 뜻만 적어줘",
            },
            {
                role: 'assistant',
                content:
                    'efficient - 효율적인\n implement - 실행하다, 시행하다\n negotiate - 협상하다\n collaborate - 협업하다\n analyze - 분석하다',
            },
            {
                role: 'user',
                content: `'${subject}'에 관련된 ${level}에 자주 나오는 어휘들로 5개만 추천을 해줄래? 답변에 영어 단어와 한글 뜻만 적어줘`,
            },
        ];

        dispatch(wordQuiz(body)).then(res => {
            const result = res.payload.message.content.split('\n');
            const array = [];

            result.forEach(e => {
                const wordSplit = e.split('-');

                const object = {
                    word: wordSplit[0],
                    mean: wordSplit[1],
                };
                array.push(object);
            });

            let submit = {
                userId: users._id,
                arr: array,
            };

            dispatch(uploadFiveWords(submit))
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
            window.location.replace('/word');
            // closeModal();
        });
    };

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div ref={modalRef} className={styles.container}>
                <div>
                    <button className={styles.close} onClick={closeModal}>
                        <AiOutlineCloseCircle />
                    </button>
                    <div className={styles.h1}>
                        Let's Enter <br /> the Topic!
                    </div>
                    <div className={styles.h2}>
                        You can get recommendations <br /> for words that fit the topic!
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <textarea
                                type="text"
                                name="subject"
                                autoFocus
                                value={subject}
                                onChange={handleChange}
                                placeholder="Enter a Topic"
                            />
                            <textarea
                                type="text"
                                name="level"
                                value={level}
                                onChange={handleChange}
                                onKeyDown={onCheckEnter}
                                placeholder="Enter a Level"
                            />
                            <button type="submit">
                                <HiMagnifyingGlass />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={styles.back}></div>
        </motion.div>
    );
}
export default WordModal;
