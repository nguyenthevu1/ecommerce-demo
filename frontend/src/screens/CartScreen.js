import React, { useEffect } from 'react';
import Header from './../compnents/Header';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeToCart } from './../redux/actions/cartAction';

const CartScreen = () => {
    window.scrollTo(0, 0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);

    const productId = useParams().id
    const qty = window.location.search ? Number(window.location.search.split('=')[1]) : 1;

    const totalPrice = cartItems
        .reduce((acc, item) => acc + item.qty * item.price, 0)
        .toFixed(2);

    const price = (cartItems) => {
        return (cartItems.price * cartItems.qty).toFixed(2);
    };

    const handleChangeQty = (e, productId) => {
        dispatch(addToCart(productId, Number(e.target.value)));
    };

    const handleCheckOut = () => {
        navigate(`/shipping`);
    };

    const cartRemoveItem = (id) => {
        dispatch(removeToCart(id));
    };

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    return (
        <>
            <Header />
            <div className="container">
                <div className="alert alert-info text-center mt-3">
                    Total Card Products
                    <Link to="cart" className="text-success mx-2">({cartItems.length})</Link>
                </div>

                {/* Cart Items  */}
                {cartItems &&
                    cartItems.map((item) => (
                        <div className="cart-item row" key={item.product}>
                            <div
                                onClick={() => cartRemoveItem(item.product)}
                                className="remove-button d-flex justify-content-center align-items-center"
                            >
                                <i className="fas fa-times"></i>
                            </div>
                            <div className="cart-image col-md-3">
                                <img
                                    style={{ width: '150px' }}
                                    src={item.image}
                                    alt="nike"
                                />
                            </div>
                            <div className="cart-text col-md-5 d-flex align-items-center">
                                <Link to={`/products/${item.product}`}>
                                    <h4>{item.name}</h4>
                                </Link>
                            </div>
                            <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-content-center">
                                <h6>QUANTITY</h6>
                                <select
                                    onChange={(e) => handleChangeQty(e, item.product)}
                                    value={item.qty}
                                    style={{ width: '80px' }}
                                >
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-center">
                                <h6>SUBTOTAL</h6>
                                <h4>${price(item)}</h4>
                            </div>
                        </div>
                    ))}

                <div className="total">
                    <span className="sub">total</span>
                    <span className="total-price">${totalPrice}</span>
                </div>
                <hr />
                <div className="cart-buttons d-flex align-items-center row">
                    <Link to="/" className="col-md-6">
                        <button>Continue Shopping</button>
                    </Link>
                    {totalPrice > 0 && (
                        <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                            <button className="btn btnCheckOut" onClick={handleCheckOut}>
                                Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartScreen;
