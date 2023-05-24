// import { useForm } from "react-hook-form";
// import "./Login.css";
// import CredentailsModel from "../../../Models/CredentailsModel";
// import authService from "../../../Services/AuthService";
// import notificationService from "../../../Services/NotificationService";
// import { NavLink, Navigate, useNavigate } from "react-router-dom";

// interface LoginFormData extends CredentailsModel {
//     role: 'customer' | 'company' | 'admin';
// }

// function Login(): JSX.Element {

//     const {register, handleSubmit} = useForm<LoginFormData>();
//     const navigate = useNavigate();
    
//     async function send(credentials: LoginFormData) {
//         try {
//             await authService.login(credentials);
//             notificationService.success(`Logged in as ${credentials.role}, it's good to have you again`);
//             navigate("/home")
//         } catch (err) {
//             if (err instanceof Error) {
//                 notificationService.error(err.message);
//             } else {
//                 console.error(err);
//             }
//         }
//     }

//     return (
//         <div className="Login Box">
//             <form onSubmit={handleSubmit(send)}>
//             <h3>welcome to our coupons site, please login</h3>

//             <p>username:</p>
//             <input type="text" {...register("username")} />

//             <p>password: </p>
//             <input type="password" {...register("password")}/>

//             <p>role: </p>
//             <select {...register("role")}>
//                 <option value="customer">Customer</option>
//                 <option value="company">Company</option>
//                 <option value="admin">Admin</option>
//             </select>

//             <button>Login</button>

//             </form>
//         </div>
//     );
// }

// export default Login;

import { useForm } from "react-hook-form";
// import { useHistory } from "react-router-dom";
import "./Login.css";
import CredentailsModel from "../../../Models/CredentailsModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";

interface LoginFormData extends CredentailsModel {
  role: 'customer' | 'company' | 'admin';
}

function Login(): JSX.Element {
  const { register, handleSubmit } = useForm<LoginFormData>();
//   const history = useHistory();
const navigate = useNavigate();

  async function send(credentials: LoginFormData) {
    try {
      await authService.login(credentials);
      notificationService.success(`Logged in as ${credentials.role}, it's good to have you again`);
      
      // Redirect to the desired page
      navigate("/dashBoard"); // Replace "/customer-methods" with the desired route for customer methods
      
    } catch (err) {
      if (err instanceof Error) {
        notificationService.error(err.message);
      } else {
        console.error(err);
      }
    }
  }

  return (
    <div className="Login Box">
      <form onSubmit={handleSubmit(send)}>
        <h3>welcome to our coupons site, please login</h3>

        <p>username:</p>
        <input type="text" {...register("username")} />

        <p>password: </p>
        <input type="password" {...register("password")} />

        <p>role: </p>
        <select {...register("role")}>
          <option value="customer">Customer</option>
          <option value="company">Company</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
