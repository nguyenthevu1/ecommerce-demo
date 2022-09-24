import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../compnents/Header';
import Rating from '../compnents/homeComponents/Rating';
import Message from '../compnents/LoadingError/Error';
import Loading from '../compnents/LoadingError/Loading';
import { createProductReview, detailsProduct } from '../redux/actions/productAction';
import { PRODUCT_CREATE_REVIEW_RESET } from '../redux/constants/productConstants';
import moment from 'moment';

const SingleProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const productId = useParams().id;
    const productDetails = useSelector((state) => state.productDetails);
    const { product, loading, error } = productDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
        loading: loadingCreateReview,
        error: errorCreateReview,
        success: successCreateReview,
        message: messageCreateReview,
    } = productReviewCreate;

    const handleAddToCart = () => {
        navigate(`/cart/${productId}?qty=${qty}`);
    };

    useEffect(() => {
        if (successCreateReview) {
            alert('Review Submitted');
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(detailsProduct(productId));
    }, [dispatch, productId, navigate, successCreateReview]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createProductReview(productId, {
                rating,
                comment,
            }),
        );
        window.location.reload();
    };

    return (
        <>
            <Header />
            <div className="container single-product">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Message variant="alter-danger">{error}</Message>
                ) : (
                    <>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="single-image">
                                    <img src={product.image} alt={product.name} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="product-dtl">
                                    <div className="product-info">
                                        <div className="product-name">{product.name}</div>
                                    </div>
                                    <p>{product.description}</p>
                                    <div className="col-lg-7">
                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                            <h6>Price:</h6>
                                            <span>${product.price}</span>
                                        </div>
                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                            <h6>Status</h6>
                                            {product.countInStock > 0 ? (
                                                <span>In Stock</span>
                                            ) : (
                                                <span>Unvailable</span>
                                            )}
                                        </div>
                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                            <h6>Reviews</h6>
                                            <Rating
                                                value={product.rating}
                                                text={`${product.numReviews}`}
                                            />
                                        </div>
                                        {product.countInStock > 0 ? (
                                            <>
                                                <div className="flex-box d-flex justify-content-between align-items-center">
                                                    <h6>Quantity</h6>
                                                    <select
                                                        onChange={(e) =>
                                                            setQty(e.target.value)
                                                        }
                                                        value={qty}
                                                        style={{ width: '80px' }}
                                                    >
                                                        {[
                                                            ...Array(
                                                                product.countInStock,
                                                            ).keys(),
                                                        ].map((x) => (
                                                            <option
                                                                key={x + 1}
                                                                value={x + 1}
                                                            >
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <button
                                                    onClick={handleAddToCart}
                                                    className="round-black-btn mt-4"
                                                >
                                                    Add to Card
                                                </button>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row my-5">
                            <div className="col-md-6">
                                <h6 className="mb-3">REVIEWS</h6>
                                {product.reviews.length === 0 && (
                                    <Message variant={'alert-info mt-3'}>
                                        No Reviews
                                    </Message>
                                )}
                                {product.reviews.map((review) => (
                                    <div
                                        key={review._id}
                                        className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                                    >
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <span>{moment(review.createdAt).calendar()}</span>
                                        <div className="alert alert-info mt-3">
                                            {review.comment}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-6">
                                <h2>WRITE A CUSTOMER REVIEWS</h2>
                                <div className="my-4">
                                    {loadingCreateReview && <Loading />}
                                    {errorCreateReview && (
                                        <Message variant="alert-danger">
                                            {messageCreateReview}
                                        </Message>
                                    )}
                                </div>
                                {userInfo ? (
                                    <form onSubmit={submitHandler}>
                                        <div className="my-4">
                                            <strong>Rating</strong>
                                            <select
                                                value={rating}
                                                onChange={(e) =>
                                                    setRating(e.target.value)
                                                }
                                                className="col-12 bg-light p-3 mt-2 boder-0 rounded"
                                            >
                                                <option value="">Select...</option>
                                                <option value="1">1 - Poor</option>
                                                <option value="2">2 - Fair.</option>
                                                <option value="3">3 - Good</option>
                                                <option value="4">4 - Very Good</option>
                                                <option value="5">5 - Excellent</option>
                                            </select>
                                        </div>
                                        <div className="my-4">
                                            <strong>Comment</strong>
                                            <textarea
                                                row="3"
                                                value={comment}
                                                onChange={(e) =>
                                                    setComment(e.target.value)
                                                }
                                                className="col-12 bg-light p-3 mt-2 border-0 rounded"
                                            ></textarea>
                                        </div>
                                        <div className="my-4">
                                            <button
                                                disable={loadingCreateReview}
                                                className="col-12 border-0 p-3 text-white bg-black"
                                                style={{ backgroundColor: 'black' }}
                                            >
                                                SUBMIT
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="my-3">
                                        <Message variant={'alert-warning'}>
                                            Please
                                            <Link
                                                to="/login"
                                                style={{ margin: '0 5px', color: 'blue' }}
                                            >
                                                Login
                                            </Link>
                                            to write a review
                                        </Message>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default SingleProduct;
