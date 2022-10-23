import React from "react";
import PropTypes from "prop-types";
const Modal = ({ isOpen, classes, children }) => {
    return (
        <div className={classes + " modal " + (isOpen ? "modal_show" : "")}>
            {children}
        </div>
    );
};

Modal.propTypes = {
    classes: PropTypes.string,
    isOpen: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default Modal;
