import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './RolePrevPage.module.css';
import {motion} from 'framer-motion';
import {AiOutlineClose} from 'react-icons/ai';

function RolePrevPage() {
    const navigate = useNavigate();

    // const [gender, setGender] = useState('male');
    const [info, setInfo] = useState({
        name: '',
        gender: '',
        location: '',
        situation: '',
    });

    const inputHandler = e => {
        setInfo({...info, [e.target.name]: e.target.value});
    };

    const submitHandler = e => {
        e.preventDefault();

        const {name, gender, location, situation} = info;

        navigate('/role', {
            state: {
                name,
                gender,
                location,
                situation,
            },
        });
    };

    const onOptionChange = e => {
        setInfo(state => ({
            ...state,
            gender: `${e.target.value}`,
        }));
    };

    return (
        <motion.div className={`${styles.container}`} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div className={styles.formBox}>
                <div>
                    Let me <br /> Introduce Myself!
                </div>
                <div>
                    you can role-play <br /> according to the situation
                </div>
                <form onSubmit={submitHandler}>
                    {/* <input name="gender" type="text" onChange={inputHandler} required /> */}
                    <div className={`${styles.radioBox}`}>
                        <label className={`${styles.genderLabel}`}>
                            male
                            <input
                                className={`${styles.genderInput}`}
                                type="radio"
                                name="gender"
                                value="male"
                                onChange={onOptionChange}
                                required
                            />
                        </label>
                        <label className={`${styles.genderLabel}`}>
                            female
                            <input
                                className={`${styles.genderInput}`}
                                type="radio"
                                name="gender"
                                value="female"
                                onChange={onOptionChange}
                                required
                            />
                        </label>
                    </div>
                    <label>
                        name:
                        <input name="name" type="text" onChange={inputHandler} required />
                    </label>
                    <label>
                        location:
                        <input name="location" type="text" onChange={inputHandler} required />
                    </label>
                    <label>
                        situation:
                        <input name="situation" type="text" onChange={inputHandler} required />
                    </label>

                    <button className={styles.nextBtn}>
                        <div></div>
                        Next
                    </button>
                </form>
                <button className={styles.prevBtn} onClick={() => navigate('/main')}>
                    <AiOutlineClose />
                </button>
            </div>
        </motion.div>
    );
}

export default RolePrevPage;
