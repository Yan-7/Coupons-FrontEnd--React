import { useEffect, useState } from "react";
import UserModel from "../../../Models/UsereModel";
import "./AuthMenu.css";
import { authStore } from "../../../Redux/AuthenticationState";
import { NavLink } from "react-router-dom";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel | null>(null);

    useEffect(() => {
        const currentState = authStore.getState().user;
        setUser(currentState ? {...currentState} : null); // Defensively copy the user object

        const unsubscribe = authStore.subscribe(() => {
            const newState = authStore.getState().user;
            setUser(newState ? {...newState} : null); // Defensively copy the user object
        });

        return () => {
            unsubscribe();
        };
    }, []);
 
    return (
        <div className="AuthMenu">
            {!user && 
            <>
                <span>Welcome to our coupons shop</span>

                <span> | </span>
                
                <NavLink to="/register">Register</NavLink>
                
                <span> | </span>

                <NavLink to="/login">Login</NavLink>
            </>
            }

            {user &&
                <>
                    <span>
                        Welcome {user.firstName || 'Unknown'} {user.lastName || ''}
                    </span>
                    <NavLink to="/logout">Logout</NavLink>
                </>
            }
        </div>
    );
}

export default AuthMenu;
