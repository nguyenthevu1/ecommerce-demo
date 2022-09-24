import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import Toast from '../LoadingError/Toast';
import { toast } from 'react-toastify';
import { updateUserProfile } from '../../redux/actions/userActions';

const ProfileTabs = ({ userInfo }) => {
    const [email, setEmail] = useState(userInfo?.email);
    const [name, setName] = useState(userInfo?.name);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const toastId = React.useRef(null);

    const Toastobjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        pauOnHover: false,
        autoClose: 2000,
    };

    const dispatch = useDispatch();

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { loading, error } = userUpdateProfile;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading: updateLoading, user } = userDetails;
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error('Password do not match', Toastobjects);
            }
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }));
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.success('Profile updated', Toastobjects);
            }
        }
    };
    return (
        <>
            <Toast />
            {error && <Message variant="alert-danger"></Message>}
            {loading && <Loading />}
            {updateLoading && <Loading />}
            <form className="row form-container" onSubmit={submitHandler}>
                <div className="col-md-6">
                    <div className="form">
                        <label htmlFor="account-fn">UserName</label>
                        <input
                            className="form-control"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form">
                        <label htmlFor="account-email">E-mail Address</label>
                        <input
                            className="form-control"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form">
                        <label htmlFor="account-pass">New Password</label>
                        <input
                            className="form-control"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form">
                        <label htmlFor="account-comfirm-pass">Comfirm Password</label>
                        <input
                            className="form-control"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="********"
                        />
                    </div>
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </>
    );
};

export default ProfileTabs;
