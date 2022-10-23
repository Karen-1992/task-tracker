import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
import { createTask } from "../../store/tasks.slice";
import localStorageService from "../../services/localStorage.service";
import TextField from "../common/form/textField";

const AddTaskForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const initialData = {
        content: ""
    };
    const [data, setData] = useState(initialData);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const clearForm = () => {
        setData(initialData);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLoggedIn) return navigate("/auth/login");
        const isValid = data?.content.length > 0;
        if (!isValid) return;
        dispatch(
            createTask({
                ...data,
                userId: localStorageService.getUserId()
            })
        );
        clearForm();
    };
    const isValid = data?.content.length > 0;
    return (
        <form className="form" onSubmit={handleSubmit}>
            <TextField
                name="content"
                value={data.content}
                onChange={handleChange}
                withValidation={false}
                placeholder="What needs to be done?"
            />
            <button className="button" type="submit" disabled={!isValid}>
                Add
            </button>
        </form>
    );
};

export default AddTaskForm;
