import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
} from '../constants/productConstants';
import axios from 'axios';
import { logout } from './userActions';

export const listProduct =
    (keyword = '', pageNumber = '') =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_LIST_REQUEST });

            const { data } = await axios.get(
                `http://localhost:5000/api/products?keyword=${keyword}&pageNumber=${pageNumber}`,
            );
            dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
        } catch (error) {
            const message = error.data.message ? error.data.message : error.message;
            dispatch({ type: PRODUCT_LIST_FAIL, payload: message });
        }
    };

export const detailsProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);

        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
    } catch (error) {
        const message = error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: message });
    }
};

// PRODUCT REVIEW CREATE

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios.post(
            `http://localhost:5000/api/products/review/${productId}`,
            review,
            config,
        );
        dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
        const message = error.data.message ? error.data.message : error.message;
        if (message === 'Not Authorized') {
            dispatch(logout());
        }

        dispatch({ type: PRODUCT_CREATE_REVIEW_FAIL, payload: message });

        dispatch({ type: PRODUCT_CREATE_REVIEW_FAIL, payload: message });
    }
};
