import { useEffect, useState } from "react";
import UserModel from "../../../Models/UsereModel";
import "./AuthMenu.css";
import { authStore } from "../../../Redux/AuthenticationState";
import { NavLink } from "react-router-dom";

function AuthMenu(): JSX.Element {
    // State to hold the user information
    const [user, setUser] = useState<UserModel | null>(null);

    useEffect(() => {
        // Get the initial user state from the authStore
        const currentState = authStore.getState().user;
        // Set the user state with a defensively copied object
        setUser(currentState ? { ...currentState } : null);

        // Subscribe to changes in the authStore to keep the user state updated
        const unsubscribe = authStore.subscribe(() => {
            const newState = authStore.getState().user;
            // Set the user state with a defensively copied object
            setUser(newState ? { ...newState } : null);
        });

        // Clean up the subscription on component unmount
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
