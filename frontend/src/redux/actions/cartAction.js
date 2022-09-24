import axios from 'axios';
import {
    ADD_TO_CART,
    CART_SAVE_PAYMENT_METHOD,
    REMOVE_TO_CART,
} from '../constants/cartConstants';
import { CART_SAVE_SHIPPING_ADDRESS } from './../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
    const product = data.product;

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: product._id,
            name: product.name,
            image: product.image,
            description: product.description,
            price: product.price,
            countInStock: product.countInStock,
            qty,
        },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeToCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_TO_CART,
        payload: id,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentAddress = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    });

    localStorage.setItem('paymentMethod', JSON.stringify(data));
};
