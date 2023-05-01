import { useNavigate, useParams } from "react-router-dom";
import "./CouponDetails.css";
import CouponModel from "../../Models/CouponModel";
import { useEffect, useState } from "react";
import couponsService from "../../../Services/CouponsService";
import notificationService from "../../../Services/NotificationService";

function CouponDetails(): JSX.Element {

    const params = useParams();
    const couponId = +params.couponId;
    console.log(couponId);

    const navigate = useNavigate();

    const [coupon, setCoupon] = useState<CouponModel>();

    useEffect(() => {
        couponsService.getOneCoupon(couponId).then(
            (c) => setCoupon(c),
            (e) => notificationService.error(e)
        );
    },[]);
    



    return (
        <div className="CouponDetails">
			

        </div>
    );
}

export default CouponDetails;
