import axios from "axios";
import CouponModel from "../Components/Models/CouponModel";
import { addCouponAction, couponsStore, fetchCouponAction } from "../Components/Redux/CouponsState";
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
    
    
}

const couponsService = new CouponsService();

export default couponsService;