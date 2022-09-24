import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import SingleProduct from './screens/SingleProduct';
import Login from './screens/Login';
import Register from './screens/Register';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import ProfileScreen from './screens/ProfileScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOderScreen from './screens/PlaceOderScreen';
import OderScreen from './screens/OderScreen';
import Notfound from './screens/Notfound';
import './App.scss'
import App from './App.js';
ReactDOM.render(

    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route >
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
                    <Route path="/shipping" element={<ShippingScreen />} />
                    <Route path="/profile" element={<ProfileScreen />} />
                    <Route path="/payment" element={<PaymentScreen />} />
                    <Route path="/placeorder" element={<PlaceOderScreen />} />
                    <Route path="/order/:id" element={<OderScreen />} />
                    <Route path="/order" element={<OderScreen />} />
                    <Route path="*" element={<Notfound />} />
                </Route>

            </Routes>
        </BrowserRouter>


    </Provider>,
    document.getElementById('root'),
);
