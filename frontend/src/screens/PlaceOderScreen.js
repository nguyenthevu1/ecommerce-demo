import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ORDER_CREATE_RESET } from '../redux/constants/orderConstants';
import Header from './../compnents/Header';
import Message from './../compnents/LoadingError/Error';
import { createOrder } from './../redux/actions/orderAction';
const PlaceOderScreen = () => {
    window.scrollTo(0, 0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { order, success } = useSelector((state) => state.orderCreate);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    );
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
    cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice));
    cart.totalPrice =
        Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
        if (success) {
            navigate(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [success, navigate, order, dispatch, userInfo]);

    const placeOrderHandler = (e) => {
        e.preventDefault();
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }),
        );
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className="row oder-detail">
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                        <div className="row ">
                            <div
                                className="col-md-4 center"
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div className="alert-success order-box">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div className="col-md-8 center">
                                    <h5>
                                        <th>Customer</th>
                                    </h5>
                                    <p>{userInfo?.name}</p>
                                    <p>{userInfo?.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                        <div className="row">
                            <div
                                className="col-md-4 center"
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div className="alert-success order-box">
                                    <i class="fas fa-shipping-fast"></i>
                                </div>
                                <div className="col-md-8 center">
                                    <h5>
                                        <th>Oder Info</th>
                                    </h5>
                                    <p>Shipping: {cart.shippingAddress.country}</p>
                                    <p>Pay method: {cart.paymentMethod}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                        <div className="row">
                            <div
                                className="col-md-4 center"
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div className="alert-success order-box">
                                    <i class="fas fa-map-marker-alt"></i>
                                </div>
                                <div className="col-md-8 center">
                                    <h5>
                                        <th>Deliver to</th>
                                    </h5>
                                    <p>
                                        Address: {cart.shippingAddress.city},{' '}
                                        {cart.shippingAddress.address},{' '}
                                        {cart.shippingAddress.postalCode}{' '}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row order-products  justify-content-between">
                        <div className="col-lg-8">
                            {cart.cartItems.length === 0 ? (
                                <Message variant="alert-info mt-5">
                                    Your cart is empty
                                </Message>
                            ) : (
                                <>
                                    {cart.cartItems.map((item, index) => (
                                        <div className="order-product row" key={index}>
                                            <div className="col-md-3 col-6">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="col-md-5 col-6 d-flex align-items-center">
                                                <Link to={`products/${item.product}`}>
                                                    <h6>{item.name}</h6>
                                                </Link>
                                            </div>
                                            <div className="mt-3 mt-md-0 col-md-2 col-6 d-flex flex-column align-items-center">
                                                <h4>QUANTITY</h4>
                                                <h6>{item.qty}</h6>
                                            </div>
                                            <div className="mt-3 mt-md-0 col-md-2 col-6 d-flex flex-column align-items-center">
                                                <div>
                                                    <h4>SUBTOTAL</h4>
                                                    <h6>${item.price * item.qty}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                        <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th>Products</th>
                                        <td>${cart.itemsPrice}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>${cart.shippingPrice}</td>
                                    </tr>
                                    <tr>
                                        <th>Tax</th>
                                        <td>${cart.taxPrice}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>${cart.totalPrice}</td>
                                    </tr>
                                </tbody>
                            </table>
                            {cart.cartItems.length === 0 ? null : (
                                <button type="submit" onClick={placeOrderHandler}>
                                    PLACE ORDER
                                </button>
                            )}
                            {/* {error && (
                                <div className="my-3 col-12">
                                    <Message variant="alert-danger">{error}</Message>
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlaceOderScreen;
