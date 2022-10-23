import React from "react";
import PropTypes from "prop-types";

const TextField = ({
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
    error,
    withValidation
}) => {
    const handleChange = ({ target }) => {
        if (target.type === "number") {
            onChange({ name: target.name, value: +target.value });
        } else {
            onChange({ name: target.name, value: target.value });
        }
    };

    return (
        <div className="input__group">
            <label className="label" htmlFor={name}>
                {label}
            </label>
            <div className="">
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    className={"input " + (error ? "input_error" : "")}
                />
                {error && withValidation && (
                    <div className="text-error content-sm">{error}</div>
                )}
            </div>
        </div>
    );
};
TextField.defaultProps = {
    type: "text",
    withValidation: true
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    error: PropTypes.string,
    withValidation: PropTypes.bool
};

export default TextField;
