import {
    ADD_TO_CART,
    REMOVE_TO_CART,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS,
} from '../constants/cartConstants';
export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const exitsItem = state.cartItems.find((x) => x.product === item.product);
            if (exitsItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === exitsItem.product ? item : x,
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        case REMOVE_TO_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload),
            };

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            };
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };
        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: [],
            };
        default:
            return { ...state };
    }
};
