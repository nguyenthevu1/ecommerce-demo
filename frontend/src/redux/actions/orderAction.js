import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_PAYMENT_FAIL,
    ORDER_PAYMENT_REQUEST,
    ORDER_PAYMENT_SUCCESS,
} from './../constants/orderConstants';
import axios from 'axios';
import { CART_CLEAR_ITEMS } from './../constants/cartConstants';
import { logout } from './userActions';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.post(
            `http://localhost:5000/api/orders`,
            order,
            config,
        );

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
        dispatch({ type: CART_CLEAR_ITEMS });
        localStorage.removeItem('cartItems');
        localStorage.removeItem('shippingAddress');
    } catch (message) {
        const messagee = message.data.message ? message.data.message : message.message;
        if (message === 'Not Authorized') {
            dispatch(logout());
        }

        dispatch({ type: ORDER_CREATE_FAIL, payload: messagee });
    }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(
            `http://localhost:5000/api/orders/${id}`,
            config,
        );

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (message) {
        const messagee = message.data.message ? message.data.message : message.message;
        if (message === 'Not Authorized') {
            dispatch(logout());
        }

        dispatch({ type: ORDER_DETAILS_FAIL, payload: messagee });
    }
};

export const orderPayment = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAYMENT_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `http://localhost:5000/api/orders/pay/${orderId}`,
            paymentResult,
            config,
        );

        dispatch({ type: ORDER_PAYMENT_SUCCESS, payload: data });
    } catch (message) {
        const messagee = message.data.message ? message.data.message : message.message;
        if (message === 'Not Authorized') {
            dispatch(logout());
        }

        dispatch({ type: ORDER_PAYMENT_FAIL, payload: messagee });
    }
};

export const myOrderList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_MY_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`http://localhost:5000/api/orders`, config);

        dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
    } catch (message) {
        const messagee = message.data.message ? message.data.message : message.message;
        if (message === 'Not Authorized') {
            dispatch(logout());
        }

        dispatch({ type: ORDER_LIST_MY_FAIL, payload: messagee });
    }
};
