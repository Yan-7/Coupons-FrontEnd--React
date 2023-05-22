import { useNavigate } from "react-router-dom";
import "./Logout.css";
import { useEffect } from "react";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";

function Logout(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        try {
            authService.logout();
            notificationService.success("good bye, hope to see you again")
        } catch (error) {
            notificationService.error("Failed to logout");
            console.error("Failed to logout", error);
        } finally {
            navigate("/home");
        }
    }, []);

    return null;
}

export default Logout;
