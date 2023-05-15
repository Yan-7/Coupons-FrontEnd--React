import { useEffect, useState } from "react";
import UserModel from "../../../Models/UsreModel";
import "./AuthMenu.css";
import { authStore } from "../../../Redux/AuthenticationState";
import { NavLink } from "react-router-dom";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);

        const unsubscribe =authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        return () => {
            unsubscribe();
        };
    },[]);
 
    return (
        <div className="AuthMenu">
			{!user && 
            <>
            <span>
                Welcome to our coupons shop
            </span>

            <span> | </span>
            
            <NavLink to="register">Register</NavLink>
            
            <span> | </span>

            <NavLink to="/login">Login</NavLink>
            </>
            }

            {user &&
                <>
                    <span>
                        Welcome {user.firstName} {user.lastName}
                    </span>
                    <NavLink to="logout">Logout</NavLink>
                </>
            }
        </div>
    );
}

export default AuthMenu;
