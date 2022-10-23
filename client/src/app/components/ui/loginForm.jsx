import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../store/users";
import { NavLink, useNavigate } from "react-router-dom";
import MainImage from "../common/mainImage";
import key from "../../style/images/img/Key.png";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const loginError = useSelector(getAuthErrors());
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Please fill in the required field"
            }
        },
        password: {
            isRequired: {
                message: "Please fill in the required field"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(login({ payload: data }));
        navigate("/");
    };
    return (
        <>
            <div>
                <MainImage innerImage={key} />
            </div>
            <div className="form__container">
                <h2 className="">Sign In</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="mail@gmail.com"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        error={errors.password}
                        placeholder="********"
                    />
                    {loginError && <p className="">{loginError}</p>}
                    <button
                        className="button button_submit"
                        type="submit"
                        disabled={!isValid}
                    >
                        Submit
                    </button>
                </form>
                <p className="form__subtext">
                    <span> Dont have an account? </span>
                    <NavLink to={"/auth/signup"}>Sign Up</NavLink>
                </p>
            </div>
        </>
    );
};

export default LoginForm;
