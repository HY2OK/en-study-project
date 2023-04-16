import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../../features/user/userSlice';
import {useNavigate} from 'react-router-dom';
import Auth from '../../hoc/auth';

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const {name, email, password, confirmPassword} = formData;

    const onSubmitHandler = e => {
        e.preventDefault();

        let body = {
            name,
            email,
            password,
        };

        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        dispatch(registerUser(body)).then(res => {
            console.log(res);
            if (res.payload.success) {
                navigate('/login');
            } else {
                alert('회원가입 실패');
            }
        });
    };

    return (
        <div className="Main-Login p-5">
            <div className="fs-1 mb-5">Register</div>
            <form className="d-flex justify-content-center align-self-center flex-column" onSubmit={onSubmitHandler}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="name"
                        value={name}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="email"
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="password"
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Auth(RegisterPage, false);
