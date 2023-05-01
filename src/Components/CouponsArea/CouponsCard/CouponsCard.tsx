import { NavLink } from "react-router-dom";
import CouponModel from "../../Models/CouponModel";
import "./CouponsCard.css";
import appConfig from "../../../Utils/Config";

interface CouponCardProps{
    coupon: CouponModel
}

function CouponsCard(props: CouponCardProps): JSX.Element {
    return (
        <div className="CouponsCard Box">
            {props.coupon.name} <br />
            Price: ${props.coupon.price} <br/>
            Stock: {props.coupon.stock}
			<div>
                <NavLink to={"coupons/details/" + props.coupon.id}>
                <img src = {appConfig.productsImagesUrl + props.coupon.image} />
                </NavLink>
            </div>
        </div>
    );
}

export default CouponsCard;
