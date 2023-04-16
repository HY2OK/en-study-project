import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../features/user/userSlice';
import {useNavigate} from 'react-router-dom';
import Auth from '../../hoc/auth';

function LoginPage(props) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const {email, password} = formData;

    const onSubmitHandler = e => {
        e.preventDefault();

        let body = {
            email,
            password,
        };

        dispatch(loginUser(body)).then(res => {
            console.log(res);
            if (res.payload.loginSuccess) {
                navigate('/main');
            } else {
                alert('로그인 실패');
            }
        });
    };

    return (
        <div className="Main-Login p-5">
            <div className="fs-1 mb-5">Login</div>
            <form className="d-flex justify-content-center align-self-center flex-column" onSubmit={onSubmitHandler}>
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
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Auth(LoginPage, false);
