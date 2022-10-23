import React from "react";
import PropTypes from "prop-types";

const MainImage = ({ classes, innerImage }) => {
    return (
        <div className={classes}>
            <img src={innerImage} alt="main" />
        </div>
    );
};

export default MainImage;

MainImage.defaultProps = {
    innerImage: PropTypes.node,
    classes: "main__image"
};

MainImage.propTypes = {
    innerImage: PropTypes.node,
    classes: PropTypes.string
};
