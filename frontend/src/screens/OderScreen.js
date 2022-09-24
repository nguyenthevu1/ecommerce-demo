import React, { useEffect, useState } from 'react';
import Header from './../compnents/Header';
import { Link, useParams } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetails, orderPayment } from './../redux/actions/orderAction';
import Loading from './../compnents/LoadingError/Loading';
import Message from './../compnents/LoadingError/Error';
import moment from 'moment';
import axios from 'axios';
import { ORDER_PAYMENT_RESET } from './../redux/constants/orderConstants';

const OderScreen = () => {
    window.scrollTo(0, 0);
    const dispatch = useDispatch();
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderDetails);
    const { loading: loadingPay, success: successPay } = orderPay;

    const [sdkReady, setSdkReady] = useState(false);

    const orderId = useParams().id;
    const successPaymentHandler = (paymentResult) => {
        dispatch(orderPayment(orderId, paymentResult));
        window.location.reload();
    };
    useEffect(() => {
        const addPayScript = async () => {
            const { data: clientId } = await axios.get(
                'http://localhost:5000/api/config/paypal',
            );
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        if (!order || successPay) {
            dispatch({ type: ORDER_PAYMENT_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!order?.isPaid) {
            if (!window.paypal) {
                addPayScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, orderId, order, successPay]);

    return (
        <>
            <Header />
            {loading ? (
                <Loading />
            ) : error ? (
                <Message variant="alter-danger">{error}</Message>
            ) : (
                <div className="container mt-3">
                    <div className="row order-detail">
                        <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                            <div className="row">
                                <div className="col-md-4 center">
                                    <div className="alert-success order-box">
                                        <i className="fas fa-user"></i>
                                    </div>
                                </div>
                                <div className="col-md-8 center">
                                    <h5>
                                        <th>Customer</th>
                                    </h5>
                                    <p>{order?.user.name}</p>
                                    <p>
                                        <a href={`mailto:${order?.user.email}`}>
                                            {order?.user.email}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                            <div className="row">
                                <div className="col-md-4 center">
                                    <div className="alert-success order-box">
                                        <i className="fas fa-truck"></i>
                                    </div>
                                </div>
                                <div className="col-md-8 center">
                                    <h5>
                                        <th>Oder Info</th>
                                    </h5>
                                    <p>Shipping: {order?.shippingAddress.country}</p>
                                    <p>PayPal: {order?.paymentMethod}</p>
                                    {order?.isPaid ? (
                                        <div className="bg-info p-2 col-12">
                                            <p className="text-white text-center text-sm-start">
                                                Paid on {moment(order.paidAt).calendar()}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="bg-danger p-2 col-12">
                                            <p className="text-white text-center text-sm-start">
                                                Not Paid
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                            <div className="row">
                                <div className="col-md-4 center">
                                    <div className="alert-success order-box">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                </div>
                                {order?.isDelivered ? (
                                    <div className="col-md-8 center">
                                        <h5>
                                            <th>Deliver to</th>
                                        </h5>
                                        <p>Addres: Hà nội</p>
                                        <p>PayPal</p>
                                        <div className="bg-info p-2 col-12">
                                            <p className="text-white text-center text-sm-start">
                                                Deliver on{' '}
                                                {moment(order.deliveredAt).calendar()}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col-md-8 center">
                                        <h5>
                                            <th>Deliver to</th>
                                        </h5>
                                        <p>Addres: Hà nội</p>
                                        <p>PayPal</p>
                                        <div className="bg-danger p-2 col-12">
                                            <p className="text-white text-center text-sm-start">
                                                Not Deliver
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row order-products d-flex justify-content-between">
                        <div className="col-lg-8">
                            {order?.orderItems.length === 0 ? (
                                <Message variant="alter-info mt-5">
                                    Your order is empty
                                </Message>
                            ) : (
                                <div>
                                    {order?.orderItems.map((item, index) => (
                                        <div key={index} className="order-product row">
                                            {' '}
                                            <div className="col-md-3 col-6">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="col-md-5 col-6 d-flex align-items-center">
                                                <Link to={`/`}>
                                                    <h6>{item.name}</h6>
                                                </Link>
                                            </div>
                                            <div className="mt-3 mt-md-0 col-6 col-md-2  d-flex align-items-center flex-column justify-content-center ">
                                                <h4>QUANTITY</h4>
                                                <h6>{item.qty}</h6>
                                            </div>
                                            <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center">
                                                <h4>SUBTOTAL</h4>
                                                <h6 style={{ marginRight: '20px' }}>
                                                    ${item.price * item.qty}
                                                </h6>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                            <table className="table table-bordered ">
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th>Products</th>
                                            <td>${order?.itemsPrice}</td>
                                        </tr>
                                        <tr>
                                            <th>Shipping</th>
                                            <td>${order?.shippingPrice}</td>
                                        </tr>
                                        <tr>
                                            <th>Tax</th>
                                            <td>${order?.taxPrice}</td>
                                        </tr>
                                        <tr>
                                            <th>Total</th>
                                            <td>${order?.totalPrice}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </table>
                            {!order?.isPaid && (
                                <div className="col-12">
                                    {loadingPay && <Loading />}
                                    {!sdkReady ? (
                                        <Loading />
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OderScreen;
