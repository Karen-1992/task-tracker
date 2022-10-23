import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getIsLoggedIn,
    getUserLoadingStatus,
    loadUserData
} from "../../../store/users";
import { getDataStatus, loadTasksList } from "../../../store/tasks.slice";
import localStorageService from "../../../services/localStorage.service";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const usersStatusLoading = useSelector(getUserLoadingStatus());
    const userId = localStorageService.getUserId();
    const dataStatus = useSelector(getDataStatus());
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadUserData());
            if (!dataStatus) {
                dispatch(loadTasksList({ userId }));
            }
        }
    }, [isLoggedIn]);
    if (usersStatusLoading) return "Loading...";
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
