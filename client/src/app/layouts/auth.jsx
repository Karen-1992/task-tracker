import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
    return (
        <div className="auth">
            <div className="auth__wrapper">
                <Outlet />
            </div>
        </div>
    );
};

export default Auth;
