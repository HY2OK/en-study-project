import React, {useEffect} from 'react';

import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {authUser} from '../features/user/userSlice';

function auth(SpecificComponent, option, adminRoute = null) {
    // null 아무나 출입 가능 페이지
    // true 로그인한 유저만 출입 가능
    // false 로그인한 유저는 출입 불강

    function AuthenticationCheck(props) {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(authUser()).then(async res => {
                if (!res.payload.isAuth) {
                    if (option) {
                        await navigate('/login');
                    }
                } else {
                    if (adminRoute && !res.payload.isAdmin) {
                        navigate('/');
                    } else {
                        if (option === false) {
                            navigate('/main');
                        }
                    }
                }
            });
        }, []);
        return <SpecificComponent />;
    }
    return AuthenticationCheck;
}

export default auth;
