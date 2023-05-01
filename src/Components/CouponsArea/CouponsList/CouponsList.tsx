import { useEffect, useState } from "react";
import "./CouponsList.css";
import ProductModel from "../../Models/CouponModel";
import couponsService from "../../../Services/CouponsService";
import notificationService from "../../../Services/NotificationService";
import { NavLink } from "react-router-dom";


function CouponsList(): JSX.Element {

    const [coupons,setCoupons] = useState<ProductModel[]>([]);

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

            {coupons.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
}

export default CouponsList;
