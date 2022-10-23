import React from "react";
import PropTypes from "prop-types";

const Greeting = ({ name }) => {
    return (
        <div className="greeting">
            {name ? (
                <>
                    <h1 className="heading-light">{`Hello, ${name}!`}</h1>
                    <h1>Write your task now</h1>
                </>
            ) : (
                <>
                    <h1 className="heading-light">Hello!</h1>
                    <h1>Write your first task now</h1>
                </>
            )}
        </div>
    );
};

export default Greeting;

Greeting.propTypes = {
    name: PropTypes.string
};
