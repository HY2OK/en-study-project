import React, {useEffect, useRef, useState} from 'react';
import {roleChat} from '../../features/role/roleSlice';
import {useDispatch} from 'react-redux';
import {AiOutlineLoading3Quarters, AiOutlineArrowLeft} from 'react-icons/ai';
import {BsFillArrowUpCircleFill} from 'react-icons/bs';
import {useLocation, useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';

import styles from './RolePage.module.css';

function RolePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const paramsLocation = useLocation();
    const scrollRef = useRef();

    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState({
        role: 'user',
        content: '',
    });
    const [chat, setChat] = useState([]);

    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [chat]);

    const startBtn = e => {
        const {name, gender, location, situation} = paramsLocation.state;
        console.log(name, gender, location, situation);
        const start = {
            role: 'user',
            content: `나의 질문에 english로 채팅하자 너는 꼭 한문장으로 답변해줘. 너 역할은 이름이 ${name}이고, 성별은 ${gender}, 장소는 ${location}, 상황은 ${situation}이야 hello`,
        };

        const data = [...chat];
        data.push(start);
        console.log(data);

        setChat(state => [...state, start]);

        dispatch(roleChat(data)).then(res => {
            setChat(state => [...state, res.payload.message]);
            setPrompt(state => ({...state, content: ''}));
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);

        const data = [...chat];
        const addData = {...prompt};
        data.push(addData);

        setChat(state => [...state, prompt]);

        dispatch(roleChat(data)).then(res => {
            setLoading(false);
            setChat(state => [...state, res.payload.message]);
            setPrompt(state => ({...state, content: ''}));
        });
    };

    const handleChange = e => {
        setPrompt(state => ({...state, content: e.target.value}));
    };

    const btnClick = () => {
        navigate('/roleprev');
    };

    const onCheckEnter = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const divBox = chat.map((params, index) => {
        if (params.role === 'user') {
            return (
                <div key={index} className={styles.userBox}>
                    <span>{params.role}</span> <div>{params.content}</div>
                </div>
            );
        }
        return (
            <div key={index} className={styles.aiBox}>
                <span>{params.role}</span> <div>{params.content}</div>
            </div>
        );
    });

    return (
        <motion.div className={`${styles.container}`} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div className={styles.back} onClick={btnClick}>
                <AiOutlineArrowLeft />
            </div>
            <div className={styles.chatbot}>
                <div className={styles.board} ref={scrollRef}>
                    {divBox}
                    {loading ? <AiOutlineLoading3Quarters /> : <></>}
                </div>
                <button className={styles.startBtn} onClick={startBtn}>
                    start
                </button>

                <form onSubmit={handleSubmit}>
                    <div>
                        <textarea
                            value={prompt.content}
                            onChange={handleChange}
                            onKeyDown={onCheckEnter}
                            placeholder="Type your message here..."
                        ></textarea>
                        <button type="submit">
                            <BsFillArrowUpCircleFill />
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

export default RolePage;
