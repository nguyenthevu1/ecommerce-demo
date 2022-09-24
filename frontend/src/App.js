import { BrowserRouter as Routes, Route } from 'react-router-dom';
import SingleProduct from './screens/SingleProduct'
import './App.scss';
import Register from './screens/Register';
import './App.scss';
import { getUserDetails } from './redux/actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import Notfound from './screens/Notfound';
import OderScreen from './screens/OderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOderScreen from './screens/PlaceOderScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function App() {
    const alo = localStorage.getItem('userInfo')
    const dispatch = useDispatch()
    function RequireAuth({ children }) {
        if (localStorage.getItem('userInfo') === null) {
            return <Navigate to="" />;
        }
        return children;
    }

    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch]);


    return (
        <div>
            <Routes>
                <Route path="/" element={<HomeScreen />} exact />
                <Route path="/search/:keyword" element={<HomeScreen />} exact />
                <Route
                    path="/search/:keyword/page/:pagenumber"
                    element={<HomeScreen />}
                    exact
                />
                <Route path="/page/:pagenumber" element={<HomeScreen />} exact />
                <Route path="/products/:id" element={<SingleProduct />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart/:id" element={<CartScreen />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/shipping" element={<RequireAuth><ShippingScreen /></RequireAuth>} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/payment" element={<RequireAuth><PaymentScreen /></RequireAuth>} />
                <Route path="/placeorder" element={<RequireAuth><PlaceOderScreen /></RequireAuth>} />
                <Route path="/order/:id" element={<OderScreen />} />
                <Route path="/order" element={<OderScreen />} />
                <Route path="*" element={<Notfound />} />
            </Routes>
        </div>

    );
}

export default App;
