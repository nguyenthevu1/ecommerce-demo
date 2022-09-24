import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import { listProduct } from './../../redux/actions/productAction';
import Pagination from './pagination';
import Rating from './Rating';

const ShopSection = (props) => {
    const { keyword, pagenumber } = props;

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { products, loading, error, message, page, pages } = productList;

    useEffect(() => {
        dispatch(listProduct(keyword, pagenumber));
    }, [dispatch, keyword, pagenumber]);
    return (
        <div className="container">
            <div className="section">
                <div className="row">
                    <div className="col-lg-12 col-md article">
                        <div className="shopcontainer row">
                            {loading && loading ? (
                                <Loading />
                            ) : error ? (
                                <Message variant="alert-danger">{message}</Message>
                            ) : (
                                products &&
                                products.map((product) => (
                                    <div
                                        className="shop col-lg-4 col-md-6 col-sm-6"
                                        key={product._id}
                                    >
                                        <div className="boder-product">
                                            <Link to={`/products/${product._id}`}>
                                                <div className="shopBack">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                    />
                                                </div>
                                            </Link>

                                            <div className="shoptext">
                                                <p>
                                                    <Link to={`/products/${product._id}`}>
                                                        {product.name}
                                                    </Link>
                                                </p>

                                                <Rating
                                                    value={product.rating}
                                                    text={`${product.numReviews} reviews`}
                                                />
                                                <h3>${product.price}</h3>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            <Pagination
                                pages={pages}
                                page={page}
                                keyword={keyword ? keyword : ''}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopSection;
