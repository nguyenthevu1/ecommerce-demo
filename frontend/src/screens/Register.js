import React, { useEffect, useState } from 'react'
import Header from './../compnents/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from './../redux/actions/userActions'
import Message from '../compnents/LoadingError/Error'
import Loading from '../compnents/LoadingError/Loading'

const Register = () => {
    window.scrollTo(0, 0)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const redirect = window.location.search ? window.location.search.split("=")[1] : "/"

    const userRegister = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userRegister;
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, navigate, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(register(name, email, password))
    }

    return (
        <>
            <Header />
            <div className="container d-flex flex-colum justify-content-center align-items-center">
                {error && <Message variant="alert-danger">{error}</Message>}
                {loading && <Loading />}

                <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
                    <input type="text" placeholder="UserName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input type="email" placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="password" placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Register</button>
                    <p>
                        <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                            I Have Account <strong>Login</strong>
                        </Link>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Register