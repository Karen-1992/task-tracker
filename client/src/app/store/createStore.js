import { combineReducers, configureStore } from "@reduxjs/toolkit";
import TasksReducer from "./tasks.slice";
import usersReducer from "./users";

const rootReducer = combineReducers({
    users: usersReducer,
    tasks: TasksReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
