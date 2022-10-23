import React from "react";
import PropTypes from "prop-types";
import Modal from "../common/modal";

const TaskMenu = ({ onDelete, onEditTask, onOpenMenu, isMenuOpen }) => {
    return (
        <div className="task-menu" onClick={onOpenMenu}>
            <div className="task-menu__button">
                <div className="task-menu__button__item"></div>
                <div className="task-menu__button__item"></div>
                <div className="task-menu__button__item"></div>
            </div>
            <Modal isOpen={isMenuOpen} classes="task__modal">
                <span
                    className="modal__item task__modal__item"
                    onClick={onDelete}
                >
                    Delete
                </span>
                <span
                    className="modal__item task__modal__item"
                    onClick={onEditTask}
                >
                    Edit
                </span>
            </Modal>
        </div>
    );
};

export default TaskMenu;

TaskMenu.propTypes = {
    onDelete: PropTypes.func,
    onEditTask: PropTypes.func,
    onOpenMenu: PropTypes.func,
    isMenuOpen: PropTypes.bool
};
