import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./layouts/auth";
import Main from "./layouts/main";
import LogOut from "./layouts/logOut";
import Header from "./components/ui/header";
import AppLoader from "./components/ui/hoc/appLoader";
import Footer from "./components/ui/footer";
import LoginForm from "./components/ui/loginForm";
import SignUpForm from "./components/ui/signUpForm";

function App() {
    return (
        <div className="wrapper">
            <AppLoader>
                <Header />
                <Routes>
                    <Route index element={<Main />} />
                    <Route path="auth" element={<Auth />}>
                        <Route index element={<Navigate to="/auth/login" />} />
                        <Route path="login" element={<LoginForm />} />
                        <Route path="signUp" element={<SignUpForm />} />
                        <Route
                            path="*"
                            element={<Navigate to="/auth/login" />}
                        />
                    </Route>
                    <Route path="logout" element={<LogOut />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <Footer />
            </AppLoader>
        </div>
    );
}

export default App;
