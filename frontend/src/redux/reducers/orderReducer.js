import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_RESET,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAYMENT_FAIL,
    ORDER_PAYMENT_REQUEST,
    ORDER_PAYMENT_SUCCESS,
    ORDER_PAYMENT_RESET,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,
} from './../constants/orderConstants';

export const orderCreateReducer = (state = { success: false }, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const orderDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { loading: true };
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAYMENT_REQUEST:
            return { loading: true };
        case ORDER_PAYMENT_SUCCESS:
            return { loading: false, success: true };
        case ORDER_PAYMENT_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_PAYMENT_RESET:
            return {};
        default:
            return state;
    }
};

export const myOrderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_MY_REQUEST:
            return { loading: true };
        case ORDER_LIST_MY_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDER_LIST_MY_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_LIST_MY_RESET:
            return {
                orders: [],
            };
        default:
            return state;
    }
};
