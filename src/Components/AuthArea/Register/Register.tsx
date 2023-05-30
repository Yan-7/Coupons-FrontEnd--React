import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router-dom";
import "./Register.css";
import UserModel from "../../../Models/UsereModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";

interface RegisterFormData extends UserModel {}

function Register(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await authService.register(data);
      notificationService.success("Welcome " + data.firstName);
    } catch (e) {
      if (e instanceof Error) {
        notificationService.error(e.message);
      } else {
        console.error(e);
      }
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

        <button type="submit">Create new user</button>

        {/* Redirect to the main page after successful registration */}
        <NavLink to="/" className="redirect-link">
          Back to main page
        </NavLink>
      </form>
    </div>
  );
}

export default Register;
