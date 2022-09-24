import React from 'react';
import { Link } from 'react-router-dom';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';

const Oder = ({ orders, loading, error }) => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-colum">
            {loading ? (
                <Loading />
            ) : error ? (
                <Message variant="alter-danger">{error}</Message>
            ) : (
                <>
                    {orders.length === 0 ? (
                        <>
                            <div className="col-12 alert-info text-center mt-3">
                                No Order
                                <Link to="/" style={{ fontSize: '12px' }}>
                                    START SHOPPING
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>STATUS</th>
                                            <th>DATE</th>
                                            <th>TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders &&
                                            orders.map((order) => (
                                                <tr key={order._id}>
                                                    <td>
                                                        <Link
                                                            to={`/order/${order._id}`}
                                                            style={{
                                                                lineHeight: '30px',
                                                                textDecoration:
                                                                    'underline',
                                                            }}
                                                        >
                                                            {order._id}
                                                        </Link>
                                                    </td>
                                                    <td
                                                        className={`${
                                                            order.isPaid
                                                                ? 'bg-success'
                                                                : 'bg-danger'
                                                        }`}
                                                        style={{
                                                            color: 'white',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        Paid
                                                    </td>
                                                    <td>Dec 12 2022</td>
                                                    <td>$234</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                                {/* <table className="table-responsive">
                                    
                                </table> */}
                            </div>
                        </>
                    )}
                </>
            )}
            {/* <div className="col-12 alert-info text-center mt-3">
            No Ordere
        </div> */}
        </div>
    );
};

export default Oder;
