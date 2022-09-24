import React, { useEffect, useState } from 'react';
import Header from './../compnents/Header';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentAddress } from '../redux/actions/cartAction';

const PaymentScreen = ({ history }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const { shippingAddress } = cart;

    const [method, setMethod] = useState('PayPal');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentAddress(method));
        navigate('/placeorder');
    };

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
        if (!shippingAddress || shippingAddress.length <= 0) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate, userInfo]);

    return (
        <>
            <Header />
            <div className="container d-flex justify-content-center">
                <form
                    onSubmit={submitHandler}
                    className="Login2 col-md-8 col-lg-4 col-11"
                >
                    <h6>SELECT PAYMENT METHOD</h6>
                    <div className="payment-container">
                        <div className="radio-container">
                            <input
                                type="radio"
                                className="form-check-input"
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                            />
                            <label className="form-check-label">
                                PayPal or credit Card
                            </label>
                        </div>
                    </div>

                    <button type="submit">
                        <Link to="/placeorder" className="text-white">
                            Continue
                        </Link>
                    </button>
                </form>
            </div>
        </>
    );
};

export default PaymentScreen;
