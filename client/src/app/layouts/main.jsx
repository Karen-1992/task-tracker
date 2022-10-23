import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUserData, getIsLoggedIn } from "../store/users";
import Greeting from "../components/common/greeting";
import TasksList from "../components/ui/tasksList";
import AddTaskForm from "../components/ui/addTaskForm";
import mainImg from "../style/images/img/notes.png";
import MainImage from "../components/common/mainImage";

const Main = () => {
    const currentUser = useSelector(getCurrentUserData());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const getClasses = (primaryClass) => {
        return isLoggedIn
            ? primaryClass + ` ${primaryClass}_col`
            : primaryClass;
    };
    return (
        <div className={getClasses("main")}>
            <div className={getClasses("main__content")}>
                <MainImage
                    classes={getClasses("main__image")}
                    innerImage={mainImg}
                />
                <div className="main__greeting">
                    <Greeting name={currentUser?.name} />
                    <AddTaskForm />
                </div>
            </div>
            <TasksList />
        </div>
    );
};

export default Main;
