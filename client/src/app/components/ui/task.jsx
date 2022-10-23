import React, { useState } from "react";
import PropTypes from "prop-types";
import CheckBoxField from "../common/form/checkBoxField";
import { useDispatch } from "react-redux";
import { removeTask, updateTask } from "../../store/tasks.slice";
import TextField from "../common/form/textField";
import TaskMenu from "./taskMenu";

const Task = ({
    completed,
    _id,
    content,
    userId,
    onEditTask,
    isEditingTask,
    onOpenMenu,
    isMenuOpen
}) => {
    const dispatch = useDispatch();
    const handleDelete = (taskId) => {
        dispatch(removeTask(taskId));
    };
    const [isChecked, setChecked] = useState(completed);
    const [taskText, setTaskText] = useState(content);
    const handleCheck = () => {
        setChecked((prevState) => !prevState);
        dispatch(
            updateTask({
                _id,
                completed: !isChecked,
                content,
                userId
            })
        );
    };
    const handleUpdateText = () => {
        if (taskText === content) return onEditTask(_id);
        dispatch(
            updateTask({
                _id,
                content: taskText,
                userId
            })
        );
        if (isEditingTask) onEditTask(_id);
    };
    const handleChange = (target) => {
        setTaskText(target.value);
    };
    const isValid = taskText === content;
    return (
        <div className="task" key={_id}>
            <div className="task__check">
                {!isEditingTask && (
                    <CheckBoxField
                        value={isChecked}
                        onChange={handleCheck}
                        name="check"
                    />
                )}
                {isEditingTask ? (
                    <TextField
                        name="content"
                        value={taskText}
                        onChange={handleChange}
                    />
                ) : (
                    <p
                        className={
                            "task-content " +
                            (completed ? "task-content_completed" : "")
                        }
                    >
                        {content}
                    </p>
                )}
            </div>
            {isEditingTask ? (
                <button
                    className="button task__button"
                    onClick={handleUpdateText}
                >
                    {!isValid ? "Save" : "Cancel"}
                </button>
            ) : (
                <TaskMenu
                    onDelete={() => handleDelete(_id)}
                    onEditTask={() => onEditTask(_id)}
                    onOpenMenu={() => onOpenMenu(_id)}
                    isMenuOpen={isMenuOpen}
                />
            )}
        </div>
    );
};

Task.propTypes = {
    completed: PropTypes.bool.isRequired,
    _id: PropTypes.string,
    content: PropTypes.string,
    userId: PropTypes.string,
    isEditingTask: PropTypes.bool,
    onEditTask: PropTypes.func,
    onOpenMenu: PropTypes.func,
    isMenuOpen: PropTypes.bool
};

export default Task;
