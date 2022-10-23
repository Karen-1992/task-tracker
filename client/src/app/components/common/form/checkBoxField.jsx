import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange }) => {
    const handleChange = () => {
        onChange({ name, value: !value });
    };
    return (
        <div className="">
            <input
                className=""
                type="checkbox"
                // value=""
                id={name}
                onChange={handleChange}
                checked={value}
            />
        </div>
    );
};
CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func
};

export default CheckBoxField;
