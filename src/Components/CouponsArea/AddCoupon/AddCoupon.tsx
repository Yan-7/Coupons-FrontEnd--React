import { useForm } from "react-hook-form";
import "./AddCoupon.css";
import CouponModel from "../../Models/CouponModel";
import { useNavigate } from "react-router-dom";
import couponsService from "../../../Services/CouponsService";
import notificationService from "../../../Services/NotificationService";

function AddCoupon(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<CouponModel>();
  const navigate = useNavigate();

  async function send(product: CouponModel) {
    console.log(product);
    product.image = (product.image as FileList)[0];
    console.log(product.image);

    try {
      await couponsService.addOneCoupon(product);
      notificationService.success("coupon Added to database");
      navigate("/coupons");
    } catch (error: any) {
      notificationService.error(error);
    }
  }

  return (
    <div className="AddCoupon">
      <form onSubmit={handleSubmit(send)}>
        <h2>Add Product</h2>

        <label>Name: </label>
        <input
          type="text"
          {...register("name", {
            required: { value: true, message: "What is the name?" },
            minLength: {
              value: 1,
              message: "Write a longer name",
            },
          })}
        />
        <span>{formState.errors?.name?.message}</span>

        <label>price</label>
        <input
          type="number"
          {...register("price", {
            required: { value: true, message: "price not entered" },
            min: { value: 1, message: "value is below 1" },
            max: { value: 999, message: "price is too high" },
          })}
          step="0.01"
        />
        <span>{formState.errors?.price.message}</span>

        <label> stock:</label>
        <input type="number" {...register("stock")} />
        <input type="file" {...register("image")} />

        <button>Add Coupon</button>
      </form>
    </div>
  );
}

export default AddCoupon;
