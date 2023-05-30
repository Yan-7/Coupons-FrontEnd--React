import { NavLink } from "react-router-dom";
import "./CustomerPage.css";

function CustomerPage(): JSX.Element {
    return (
        <div className="CustomerPage">
            <h2>Welcome to the customer page</h2>

            <div className="buttons">
                <NavLink to="/customer/buy-coupons">
                    <button>Buy Coupons</button>
                </NavLink>
                <NavLink to="/customer/view-coupons">
                    <button>View Customer Coupons</button>
                </NavLink>
            </div>
        </div>
    );
}

export default CustomerPage;
