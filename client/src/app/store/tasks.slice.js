import { createAction, createSlice } from "@reduxjs/toolkit";
import taskService from "../services/task.service";

const initialState = {
    entities: null,
    isLoading: true,
    dataLoaded: false
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        tasksRequested: (state) => {
            state.isLoading = true;
            state.dataLoaded = false;
        },
        tasksReceived: (state, action) => {
            state.isLoading = false;
            state.dataLoaded = true;
            state.entities = action.payload;
        },
        tasksRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        taskCreated: (state, action) => {
            state.entities.unshift(action.payload);
        },
        taskRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (task) => task._id !== action.payload
            );
        },
        taskUpdateSuccessed: (state, action) => {
            state.entities[
                state.entities.findIndex(
                    (task) => task._id === action.payload._id
                )
            ] = action.payload;
        }
    }
});

const { reducer: TasksReducer, actions } = tasksSlice;
const {
    tasksRequested,
    tasksReceived,
    tasksRequestFailed,
    taskRemoved,
    taskUpdateSuccessed,
    taskCreated
} = actions;

const taskRemoveRequested = createAction("tasks/taskRemoveRequested");
const removeTaskFailed = createAction("tasks/removeTaskFailed");
const taskCreateRequested = createAction("tasks/TaskCreateRequested");
const taskCreateFailed = createAction("tasks/taskCreateFailed");
const taskUpdateRequested = createAction("tasks/taskUpdateRequested");
const taskUpdateFailed = createAction("tasks/taskUpdateFailed");

export const loadTasksList = (payload) => async (dispatch) => {
    dispatch(tasksRequested());
    try {
        const { content } = await taskService.get(payload);
        dispatch(tasksReceived(content));
    } catch (error) {
        dispatch(tasksRequestFailed(error.message));
    }
};

export const removeTask = (payload) => async (dispatch) => {
    dispatch(taskRemoveRequested());
    try {
        const { content } = await taskService.remove(payload);
        if (!content) {
            return dispatch(taskRemoved(payload));
        }
        dispatch(taskRemoved({ content, payload }));
    } catch (error) {
        dispatch(removeTaskFailed(error.message));
    }
};

export const updateTask = (payload) => async (dispatch) => {
    dispatch(taskUpdateRequested());
    try {
        const { content } = await taskService.update(payload);
        dispatch(taskUpdateSuccessed(content));
    } catch (error) {
        dispatch(taskCreateFailed(error.message));
    }
};

export const createTask = (payload) => async (dispatch) => {
    dispatch(taskCreateRequested());
    try {
        const { content } = await taskService.create(payload);
        dispatch(taskCreated(content));
    } catch (error) {
        dispatch(taskUpdateFailed(error.message));
    }
};

export const getTasksList = () => (state) => state.tasks.entities;
export const getTasksListLength = () => (state) => state.tasks.length;

export const getCompletedTaskCount = () => (state) => {
    if (state.tasks.entities) {
        let completedCounter = 0;
        for (const task of state.tasks.entities) {
            if (task.completed) {
                completedCounter++;
            }
        }
        return completedCounter;
    }
};
export const getActiveTaskCount = () => (state) => {
    if (state.tasks.entities) {
        let activeCounter = 0;
        for (const task of state.tasks.entities) {
            if (!task.completed) {
                activeCounter++;
            }
        }
        return activeCounter;
    }
};

export const getDataStatus = () => (state) => state.tasks.dataLoaded;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default TasksReducer;
