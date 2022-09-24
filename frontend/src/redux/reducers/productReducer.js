import {
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, ...state };
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                page: action.payload.page,
                products: action.payload.products,
                pages: action.payload.pages,
                error: false,
            };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: true, message: action.payload };

        default:
            return state;
    }
};

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload, error: false };
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: true, message: action.payload };

        default:
            return state;
    }
};

//REVIEW
export const productCreateReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true, ...state };
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, product: action.payload, error: false };
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: true, message: action.payload };
        case PRODUCT_CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};
