import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/users";
import { NavLink, useNavigate } from "react-router-dom";
import MainImage from "../common/mainImage";
import padlock from "../../style/images/img/Padlock.png";

const SignUpForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        equalPassword: ""
    });
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
            },
            isEmail: {
                message: "Email entered incorrectly"
            }
        },
        name: {
            isRequired: {
                message: "Please fill in the required field"
            },
            min: {
                message: "Name must be at least 3 characters long",
                value: 3
            }
        },
        password: {
            isRequired: {
                message: "Please fill in the required field"
            },
            isCapitalSymbol: {
                message: "Password must contain at least one capital letter"
            },
            isContainDigit: {
                message: "Password must contain at least one number"
            },
            min: {
                message: "Password must be at least 8 characters long",
                value: 8
            }
        },
        equalPassword: {
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
        const isEqual = data.password === data.equalPassword;
        if (!isEqual) return;
        const isValid = validate();
        if (!isValid) return;
        dispatch(signUp(data));
        navigate("/");
    };

    return (
        <>
            <div>
                <MainImage innerImage={padlock} />
            </div>
            <div className="form__container">
                <h2 className="">Create account</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        error={errors.password}
                    />
                    <TextField
                        label="Confirm password"
                        type="password"
                        name="equalPassword"
                        value={data.equalPassword}
                        onChange={handleChange}
                        error={errors.equalPassword}
                    />
                    <button
                        className="button button_submit"
                        type="submit"
                        disabled={!isValid}
                    >
                        Create account
                    </button>
                </form>
                <p className="form__subtext">
                    <span> Already have an account? </span>
                    <NavLink to={"/auth/login"}>Sign In</NavLink>
                </p>
            </div>
        </>
    );
};

export default SignUpForm;
