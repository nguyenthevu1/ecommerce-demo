import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from './screens/Login';
function Auth() {

    return (
        <Routes>
            <Route>
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
    );
}

export default Auth;