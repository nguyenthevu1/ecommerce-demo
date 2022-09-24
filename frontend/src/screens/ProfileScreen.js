import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './../compnents/Header';
import moment from 'moment';
import ProfileTabs from '../compnents/profileComponents/ProfileTabs';
import Oder from './../compnents/profileComponents/Oder';
import { myOrderList } from '../redux/actions/orderAction';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = () => {
    window.scrollTo(0, 0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderList = useSelector((state) => state.myOrders);
    const { loading, error, orders } = orderList;

    const [isShowOrder, setIsShowOrder] = useState(false);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
        dispatch(myOrderList());
    }, [userInfo, navigate, dispatch]);

    return (
        <>
            <Header />
            <div className="container mt-lg-5 mt-3">
                <div className="row align-items-center">
                    <div className="col-lg-4 p-0 shadow">
                        <div className="author-card-cover"></div>
                        <div className="author-card-profile row">
                            <div className="author-card-avatar col-md-5">
                                <img
                                    src="data:image/jpeg;base64,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"
                                    alt=""
                                />
                            </div>
                            <div className="author-card-details col-md-7">
                                <h5 className="author-card-name mb-2">
                                    <strong>{userInfo?.name}</strong>
                                </h5>
                                <span className="author-card-position">
                                    <>Joined {moment(userInfo?.createdAt).format('LL')}</>
                                </span>
                            </div>
                        </div>
                        <div className="wizard pt-3 ">
                            <div className="d-flex align-items-start">
                                <div
                                    className="nav align-items-start flex-column col-12 nav-pills me-3 "
                                    id="v-pills-table"
                                    roles="tablisst"
                                    aria-controls="vertical"
                                >
                                    <button
                                        className={`nav-link ${
                                            isShowOrder ? '' : 'active'
                                        }`}
                                        id="v-pills-home-table"
                                        data-bs-toggle="pill"
                                        type="button"
                                        role="tab"
                                        data-bs-target="#v-pills-home"
                                        aria-selected="true"
                                        aria-controls="v-pills-home"
                                        onClick={() => setIsShowOrder(false)}
                                    >
                                        Profile Settings
                                    </button>

                                    <button
                                        className={`nav-link d-flex justify-content-between ${
                                            isShowOrder ? 'active' : ''
                                        }`}
                                        id="v-pills-profile-table"
                                        data-bs-toggle="pill"
                                        data-bs-target="#v-pills-profile"
                                        type="button"
                                        role="tab"
                                        aria-selected="false"
                                        aria-controls="v-pills-profile"
                                        onClick={() => setIsShowOrder(true)}
                                    >
                                        Orders List
                                        <span className="badge2">
                                            {orders ? orders?.length : 0}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-content col-lg-8 pb-5 pt-lg-0 pt-3 mt-4">
                        {isShowOrder ? (
                            <Oder orders={orders} loading={loading} error={error} />
                        ) : (
                            <ProfileTabs userInfo={userInfo} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileScreen;
