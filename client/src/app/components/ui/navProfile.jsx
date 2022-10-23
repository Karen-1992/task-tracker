import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";
import Modal from "../common/modal";

function NavProfile() {
    const currentUser = useSelector(getCurrentUserData());
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    if (!currentUser) return "Loading...";
    return (
        <div className="profile" onClick={toggleMenu}>
            <div className="">
                <span>
                    <i className="bi bi-person"></i>
                </span>
                <span className="">{currentUser.name}</span>
                <span>
                    <i
                        className={"bi bi-chevron-" + (isOpen ? "up" : "down")}
                    ></i>
                </span>
            </div>
            <Modal isOpen={isOpen} classes="header__modal">
                <Link
                    // to="/cabinet"
                    className="modal__item header__modal__item"
                >
                    Profile
                </Link>
                <Link to="/logout" className="modal__item header__modal__item">
                    Log Out
                </Link>
            </Modal>
        </div>
    );
}

export default NavProfile;
