import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';

const Header = () => {
    const dispatch = useDispatch();

    const [keyword, setKeyword] = useState();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };
    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    };

    return (
        <>
            <div className="Announcement">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center display-none">
                            <p>+111 555 444 111</p>
                            <a
                                href="mailto:nguyenthevu2602@gmail.com"
                                style={{ cursor: 'context-menu' }}
                            >
                                trinhduc@gmail.com
                            </a>
                        </div>
                        <div className="col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
                            <a
                                target="_blank"
                                href="https://www.facebook.com/gat.nocla"
                                rel="noreferrer"
                            >
                                <i className="fab fa-facebook-f"></i>
                            </a>

                            <a
                                target="_blank"
                                href="https://www.instagram.com/psg/"
                                rel="noreferrer"
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a
                                target="_blank"
                                href="https://www.linkedin.com"
                                rel="noreferrer"
                            >
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a
                                target="_blank"
                                href="https://www.youtube.com/"
                                rel="noreferrer"
                            >
                                <i className="fab fa-youtube"></i>
                            </a>
                            <a
                                target="_blank"
                                href="https://www.youtube.com/"
                                rel="noreferrer"
                            >
                                <i className="fab fa-pinterest-p"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header">
                {/* <div className="mobile-header">
                <div className="row">
                    <div className="col-md-3 col-4 d-flex align-items-center">
                        <Link className="navbar-brand" to="/">
                            <img src="./logo192.png" alt="" />
                        </Link>
                    </div>
                    <div className="col-md-6 col-8 d-flex align-items-center">
                        <form className="input-group mt-3">
                            <input
                                type="search"
                                className="form-control rounded search"
                                placeholder="Search"
                            />
                            <button type="submit" className="search-button">
                                Search
                            </button>
                        </form>
                    </div>
                    <div
                        className=" col-md-3 d-flex align-items-center justify-content-end"
                        style={{ position: 'relative' }}
                    >
                        <div className="dropdown">
                            <button
                                type="button"
                                className="name-button dropdown-toggle"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Hi, Admin Duc
                            </button>
                            <div className="dropdown-menu ">
                                <Link className="dropdown-item" to="/profile">
                                    Profile
                                </Link>
                                <Link className="dropdown-item" to="#">
                                    Logout
                                </Link>
                            </div>
                        </div>

                        <Link to="/cart">
                            <i class="fas fa-shopping-bag"></i>
                            <span className="badge">{cartItems && cartItems.length}</span>
                        </Link>
                    </div>
                </div>
            </div> */}
                <div className="pc-header container ">
                    <div className="row">
                        <div className="col-md-3 col-4 d-flex align-items-center">
                            <Link className="navbar-brand" to="/">
                                <img src="./logo192.png" alt="" />
                            </Link>
                        </div>
                        <div className="col-md-6 col-8 d-flex align-items-center">
                            <form onSubmit={submitHandler} className="input-group mt-3">
                                <input
                                    type="search"
                                    className="form-control rounded search"
                                    placeholder="Search"
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                                <button type="submit" className="search-button">
                                    Search
                                </button>
                            </form>
                        </div>
                        <div className=" col-md-3 d-flex align-items-center justify-content-end Login-Register">
                            {userInfo ? (
                                <div className="btn-group">
                                    <button
                                        type="button"
                                        className="name-button dropdown-toggle"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        Hi, {userInfo.name}
                                    </button>
                                    <div
                                        className="dropdown-menu"
                                        style={{ zIndex: '10000' }}
                                    >
                                        <Link className="dropdown-item" to="/profile">
                                            Profile
                                        </Link>
                                        <Link
                                            className="dropdown-item"
                                            to="#"
                                            onClick={logoutHandler}
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Link to="/register">Register</Link>
                                    <Link to="/login">Login</Link>
                                </>
                            )}

                            <Link to="/cart">
                                <i className="fas fa-shopping-bag"></i>
                                <span className="badge">
                                    {cartItems && cartItems.length}
                                </span>
                            </Link>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
