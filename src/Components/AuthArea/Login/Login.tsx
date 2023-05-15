import { useForm } from "react-hook-form";
import "./Login.css";
import CredentailsModel from "../../../Models/CredentailsModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import { error } from "console";

function Login(): JSX.Element {

    const {register, handleSubmit} = useForm<CredentailsModel>();
    
    async function send(credentials:CredentailsModel) {
        try {
            await authService.login(credentials);
            notificationService.success("it's good to have you again");
        } catch (error) {
            notificationService.error(error);
        }
    }

    return (
        <div className="Login Box">
            <form onSubmit={handleSubmit(send)}>
            <h3>welocome to our coupons site, please login</h3>

            <p>username:</p>
            <input type="text" {...register("username")} />

            <p>password: </p>
            <input type="text" {...register("password")}/>

            <button>login</button>

			</form>
        </div>
    );
}

export default Login;
