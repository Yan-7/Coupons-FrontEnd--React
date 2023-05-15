import { useNavigate } from "react-router-dom";
import "./Logout.css";
import { useEffect } from "react";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";

function Logout(): JSX.Element {

    const navigate = useNavigate();

    useEffect(()=> {
        authService.logout();
        notificationService.success("good bye, hope to see you again")
        navigate("/home");
    },[]);

    return (
        null
    );
}

export default Logout;
