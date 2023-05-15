import axios from "axios";
import CouponModel from "../Models/CouponModel";
import { addCouponAction, couponsStore, deleteCouponAction, fetchCouponAction, updateCouponAction } from "../Redux/CouponsState";
import appConfig from "../Utils/Config";

class CouponsService {
    
    public async getAllCoupons(): Promise<CouponModel[]> {
        if (couponsStore.getState().coupons.length ===0) {
            const response = await axios.get<CouponModel[]>(appConfig.productsUrl);
            const coupons = response.data;
            couponsStore.dispatch(fetchCouponAction(coupons));
            return coupons;
        }

        return couponsStore.getState().coupons;
    }
   
    public async getOneCoupon(id: number): Promise<CouponModel> {
        const coupon = couponsStore.getState().coupons.find((c) => c.id === id);
        return coupon;
    }

    public async addOneCoupon(coupon: CouponModel): Promise<void> {
       const formData = new FormData();
       formData.append("name",coupon.name);
       formData.append("price",coupon.price.toString());
       formData.append("stock",coupon.stock.toString());
       formData.append("image",coupon.image as File);

       const response = await axios.post<CouponModel>(appConfig.productsUrl, formData);
       const addedCoupon = response.data;

       couponsStore.dispatch(addCouponAction(addedCoupon));
    }
    
    public async editCoupon(coupon: CouponModel): Promise<void> {
        const formData = new FormData();
        formData.append("name", coupon.name);
        formData.append("price", coupon.price.toString());
        formData.append("stock", coupon.stock.toString());
        formData.append("image", coupon.image as File);

        const response = await axios.put<CouponModel>(appConfig.productsUrl +coupon.id, formData);
        const updateCoupon = response.data;

        couponsStore.dispatch(updateCouponAction(updateCoupon));
    }

    public async deleteProduct(id: number): Promise<void> {
        await axios.delete(appConfig.productsUrl + id); // delete on backend
        // updating the global state
        couponsStore.dispatch(deleteCouponAction(id)); // delete in front global state
    }
}

const couponsService = new CouponsService();

export default couponsService;