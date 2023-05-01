import { useEffect, useState } from "react";
import "./CouponsList.css";
import CouponModel from "../../Models/CouponModel";
import couponsService from "../../../Services/CouponsService";
import notificationService from "../../../Services/NotificationService";
import { NavLink } from "react-router-dom";
import Loading from "../../SharedArea/Loading/Loading";
import CouponsCard from "../CouponsCard/CouponsCard";


function CouponsList(): JSX.Element {

    const [coupons,setCoupons] = useState<CouponModel[]>([]);

    useEffect(() => {
        couponsService.getAllCoupons().then(
            (arr) => {
                setCoupons(arr);
            },
            (err) => {
                notificationService.error(err);
            }
        );
    },[]);

    console.log();

    return (
        <div className="ProductList">
            <NavLink to="/products/new">➕</NavLink>

            {coupons.length === 0 && (<>
                <Loading />
            </>)}

            {coupons.map((c) => (
                <CouponsCard key={c.id} coupon={c} />
            ))}
        </div>
    );
}

export default CouponsList;
