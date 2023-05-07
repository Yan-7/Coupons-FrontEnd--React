import { useNavigate, useParams } from "react-router-dom";
import "./CouponDetails.css";
import CouponModel from "../../Models/CouponModel";
import { useEffect, useState } from "react";
import couponsService from "../../../Services/CouponsService";
import notificationService from "../../../Services/NotificationService";
import appConfig from "../../../Utils/Config";
import { NavLink } from "react-router-dom";

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
    
    async function deleteProduct() {
        try {
          const ok = window.confirm("Are you sure?");
          if (!ok) return; //!ok ?
          await couponsService.deleteProduct(couponId);
          notificationService.success("coupon Deleted");
          navigate("/coupons");
        } catch (error: any) {
            notificationService.error(error);
        }
      }
    



      return (
        <div className="ProductDetails">
          {coupon && (
            <>
              <h3>Name: {coupon.name}</h3>
              <h3>Price: ${coupon.price}</h3>
              <h3>Stock: {coupon.stock}</h3>
              <img src={appConfig.productsImagesUrl + coupon.imageName} alt="" />
    
              <br />
              <br />
    
              <NavLink to="/coupons/"> Back to Products</NavLink>
    
              <span> | </span>
    
              <NavLink to={"/coupons/edit/" + couponId}>
                Update
              </NavLink>
    
              <span> | </span>
    
              <NavLink to="" onClick={deleteProduct}> Delete </NavLink>
            </>
          )}
        </div>
      );
    }

export default CouponDetails;
