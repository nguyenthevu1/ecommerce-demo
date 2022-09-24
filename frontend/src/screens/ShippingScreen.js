import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from './../compnents/Header';
import { saveShippingAddress } from './../redux/actions/cartAction';

const ShippingScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const userLogin = useSelector((state) => state.userLogin);
    const { shippingAddress } = cart;
    const { userInfo } = userLogin;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };
    useEffect(() => {
        if (!userInfo || Object.values(userInfo).length <= 0) {
            navigate('/login?redirect=shipping');
        }
    }, [userInfo, navigate]);
    return (
        <>
            <Header />
            <div className="container d-flex justify-content-center align-items-center login-center">
                <form onSubmit={submitHandler} className="Login col-md-8 col-lg-4 col-11">
                    <h6>DELIVERY ADDRESS</h6>
                    <input
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter postal code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <button type="submit">Continue</button>
                </form>
            </div>
        </>
    );
};

export default ShippingScreen;
