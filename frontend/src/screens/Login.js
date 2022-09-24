import React, { useEffect, useState } from 'react';
import Header from './../compnents/Header';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './../redux/actions/userActions';
import Message from '../compnents/LoadingError/Error';
import Loading from '../compnents/LoadingError/Loading';

const Login = () => {
    window.scrollTo(0, 0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const redirect = window.location.search ? window.location.search.split('=')[1] : '/';

    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;
    useEffect(() => {
        if (userInfo) {
            navigate(`${redirect}`);
        }
    }, [userInfo, navigate, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <>
            <Header />
            <div className="container d-flex flex-clum justify-content-center align-items-center">
                {error && <Message variant="alert-danger">{error}</Message>}
                {loading && <Loading />}
            </div>
            <div className="container d-flex flex-clum justify-content-center align-items-center">
                <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                    <a href="http://localhost:5000/auth/google">Login</a>
                    <p>
                        <Link
                            to={redirect ? `/register?redirect=${redirect}` : '/register'}
                        >
                            Create Account
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Login;
