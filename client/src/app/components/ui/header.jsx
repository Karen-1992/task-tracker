import React from "react";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";
import { Link } from "react-router-dom";

const Header = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <header className="header">
            <div className="header__wrapper">
                <div className="header__nav">
                    <Link className="logo" to="/">
                        <span className="ico ico-logo"></span>
                        <span className="ico ico-task"></span>
                        <span className="ico ico-success"></span>
                    </Link>
                    {isLoggedIn ? (
                        <NavProfile />
                    ) : (
                        <button className="button button_signin">
                            <Link to="/auth/login">
                                <i className="bi bi-box-arrow-in-right"></i>
                                <span>Sign In</span>
                            </Link>
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
