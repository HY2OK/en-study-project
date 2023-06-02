import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {AiOutlineArrowLeft, AiOutlineArrowDown} from 'react-icons/ai';

import styles from './DiaryPage.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {diarySave, diaryUpdate} from '../../features/diary/diarySlice';
import {useNavigate} from 'react-router-dom';
import {authUser} from '../../features/user/userSlice';

function DiaryPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [updateText, setUpdateText] = useState('');
    const user = useSelector(state => state.user.users);

    useEffect(() => {
        dispatch(authUser());
    }, []);

    const handlePress = e => {
        let data = [
            {
                role: 'user',
                content: '영어 문장 문법적으로 틀린부분 수정해줘',
            },
            {
                role: 'user',
                content: `${text}`,
            },
        ];

        dispatch(diaryUpdate(data)).then(res => {
            let origin = text.split(' ');
            let change = res.payload.message.content.split(' ');
            origin.forEach((e, index) => {
                if (e !== change[index]) {
                    change[index] = <span key={index}>{change[index]} </span>;
                } else {
                    change[index] = `${change[index]} `;
                }
            });
            console.log(change);
            setUpdateText(change);
        });
    };

    const handleSaveBtn = () => {
        let data = {
            userId: user._id,
            diary: text,
            updated: updateText,
        };
        console.log(data);
        dispatch(diarySave(data)).then(res => {
            alert('저장 완료');
            navigate('/diaryList');
        });
    };

    return (
        <motion.div className={`${styles.container}`} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div className={`${styles.content}`}>
                <div className={`${styles.header}`}>
                    <AiOutlineArrowLeft onClick={() => navigate('/diaryList')} />
                    <span onClick={() => console.log(updateText)}>Today's Diary</span>
                </div>
                <div className={`${styles.diary}`}>
                    <div className={`${styles.diaryContent}`}>
                        <textarea onChange={e => setText(e.target.value)} value={text}></textarea>
                    </div>
                </div>
                <div className={styles.update}>
                    <AiOutlineArrowDown onClick={handlePress} />
                    <div className={styles.updateBox}>
                        {updateText === '' ? (
                            <div className={styles.ripple}>
                                <div></div>
                                <div></div>
                            </div>
                        ) : (
                            updateText
                        )}
                    </div>
                </div>
                <div className={`${styles.footer}`}>
                    <button onClick={handleSaveBtn}>Save</button>
                </div>
            </div>
        </motion.div>
    );
}

export default DiaryPage;
