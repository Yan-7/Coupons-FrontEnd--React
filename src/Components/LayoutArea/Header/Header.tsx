import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
			<h1>Groupoff - the best Coupons online</h1>
            <AuthMenu/>
        </div>
    );
}

export default Header;
