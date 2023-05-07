import { useForm } from "react-hook-form";
import "./EditCoupon.css";
import CouponModel from "../../Models/CouponModel";
import { useNavigate, useParams } from "react-router-dom";
import couponsService from "../../../Services/CouponsService";
import notificationService from "../../../Services/NotificationService";
import { useEffect } from "react";

function EditCoupon(): JSX.Element {

    const { register, handleSubmit, formState, setValue} = useForm<CouponModel>();

    const navigate = useNavigate();

    const params = useParams();
    const couponId = +params.couponId;

    useEffect(() => {
        couponsService.getOneCoupon(couponId)
        .then((couponFromServer) => {
            setValue("id", couponFromServer.id);
            setValue("name", couponFromServer.name);
            setValue("price", couponFromServer.price);
            setValue("stock", couponFromServer.stock);
        })
        .catch((e) => notificationService.error(e));
    },[])

    async function send(coupon:CouponModel) {
        coupon.image = (coupon.image as FileList)[0];
        console.log(coupon.image);
        try {await couponsService.editCoupon(coupon);
            notificationService.success("coupon edited");
            navigate("coupons")
            
        } catch (error: any) {
            notificationService.error(error);
        }
    }

    return (
        <div className="EditProduct Box">
            <form onSubmit={handleSubmit(send)}>
                <h2>Edit Product</h2>

                <label>Name: </label>
                <input
                    type="text"
                    {...register("name", {
                        required: { value: true, message: "Missing name" },
                        minLength: {
                            value: 2,
                            message: "Name must be 2 characters at least",
                        },
                    })}
                />
                <span>{formState.errors?.name?.message}</span>

                <label>Price: </label>
                <input
                    type="number"
                    {...register("price", {
                        required: { value: true, message: "Missing price" },
                        min: { value: 0, message: "Price can't be negative" },
                        max: { value: 1000, message: "Price can't exceed 1000" },
                    })}
                    step="0.01"
                />
                <span>{formState.errors?.price?.message}</span>

                <label>Stock: </label>
                <input type="number" {...register("stock")} />

                <input type="file" {...register("image")} />

                <button>Update</button>
            </form>
        </div>
    );
}

export default EditCoupon;

