import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './RolePrevPage.module.css';
import {motion} from 'framer-motion';

function RolePrevPage() {
    const navigate = useNavigate();

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
                    <label>
                        name:
                        <input name="name" type="text" onChange={inputHandler} required />
                    </label>
                    <label>
                        gender:
                        <input name="gender" type="text" onChange={inputHandler} required />
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
                    <div></div>
                    Prev
                </button>
            </div>
        </motion.div>
    );
}

export default RolePrevPage;
