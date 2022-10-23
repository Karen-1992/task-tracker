import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    getActiveTaskCount,
    getCompletedTaskCount,
    getTasksList
} from "../../store/tasks.slice";
import Task from "./task";

const TasksList = () => {
    const filter = [
        {
            id: "all",
            title: "All"
        },
        {
            id: "active",
            completed: false,
            title: "Active"
        },
        {
            id: "completed",
            completed: true,
            title: "Completed"
        }
    ];
    const tasksList = useSelector(getTasksList());
    const [selectedStatus, setSelectedStatus] = useState(filter[0]);
    const [editedTaskId, setEditedTaskId] = useState();
    const [openedTaskMenuId, setOpenedTaskMenuId] = useState();
    const handleEditTask = (id) => {
        setEditedTaskId((prevState) => (prevState === id ? null : id));
    };
    const handleOpenMenu = (id) => {
        setOpenedTaskMenuId((prevState) => (prevState === id ? null : id));
    };
    const completedQuantity = useSelector(getCompletedTaskCount());
    const activeQuantity = useSelector(getActiveTaskCount());
    const handleFilter = (type) => {
        if (selectedStatus.id === type.id) return;
        setSelectedStatus(type);
    };
    const setQuantity = (quantity) => {
        return quantity !== 0 ? `(${quantity})` : null;
    };
    if (tasksList) {
        function filterTasks(data) {
            const filteredTasks =
                selectedStatus.id !== "all"
                    ? data.filter(
                        (task) => task.completed === selectedStatus.completed
                    )
                    : data;
            return filteredTasks;
        }
        const filteredTasks = filterTasks(tasksList);
        return (
            <div className="tasks">
                <h2>My Tasks</h2>
                <div className="tasks__filter ">
                    {filter.map((type) => (
                        <span
                            key={type.id}
                            onClick={() => handleFilter(type)}
                            className={
                                selectedStatus.title === type.title
                                    ? "link link_active"
                                    : "link"
                            }
                        >
                            {type.title === "All" ? (
                                <span>{type.title}</span>
                            ) : (
                                <span>
                                    {type.title}
                                    {setQuantity(
                                        !type.completed
                                            ? activeQuantity
                                            : completedQuantity
                                    )}
                                </span>
                            )}
                        </span>
                    ))}
                </div>
                <div className="tasks__list">
                    {filteredTasks.map((task) => (
                        <Task
                            key={task._id}
                            onEditTask={handleEditTask}
                            isEditingTask={editedTaskId === task._id}
                            onOpenMenu={handleOpenMenu}
                            isMenuOpen={openedTaskMenuId === task._id}
                            {...task}
                        />
                    ))}
                </div>
            </div>
        );
    } else {
        <>Loading</>;
    }
};

export default TasksList;
