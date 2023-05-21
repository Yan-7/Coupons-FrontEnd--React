import { useForm, SubmitHandler } from "react-hook-form";
import "./Register.css";
import UserModel from "../../../Models/UsreModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
// import { error } from "console";

type FormValues = {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
  };

  function Register(): JSX.Element {

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      try {
        await authService.register(data);
        notificationService.success("Welcome " + data.firstName);
      } catch (e) {
        notificationService.error(e);
      }
    };
  
    return (
      <div className="Register Box">
        <form onSubmit={handleSubmit(onSubmit)}>
  
          <h2>Register to the website</h2>
  
          <label>First name</label>
          <input type="text" {...register("firstName", { required: true })} />
          {errors.firstName && <p>First name is required.</p>}
  
          <label>Last name</label>
          <input type="text" {...register("lastName", { required: true })} />
          {errors.lastName && <p>Last name is required.</p>}
  
          <label>User name</label>
          <input type="text" {...register("userName", { required: true })} />
          {errors.userName && <p>User name is required.</p>}
  
          <label>Password</label>
          <input type="password" {...register("password", { required: true })} />
          {errors.password && <p>Password is required.</p>}
  
          <button>Create new user</button>
  
        </form>
      </div>
    );
  }
  
  export default Register;