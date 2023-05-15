import { useForm } from "react-hook-form";
import "./Register.css";
import UserModel from "../../../Models/UsreModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
// import { error } from "console";

function Register(): JSX.Element {

    const {register, handleSubmit} = useForm<UserModel>();

    async function send(user : UserModel) {
        try {
            await authService.register(user);
            notificationService.success("welcome " +user.firstName );
        } catch (e){
            notificationService.error(e);
        }
    }

    return (
        <div className="Register Box">
            <form onSubmit={handleSubmit(send)}>
            
                <h2>Register to to the website</h2>
                
                <label>First name</label>
                <input type="text" {...register("firstName")} />

                <label>Last name</label>
                <input type="text" {...register("lastName")} />

                <label> user name</label>
                <input type="text" {...register("userName")} />

                <label> password</label>
                <input type="text" {...register("password")} />
                
                <button>create new user</button>
                
            </form>
        </div>
    );
}

export default Register;
