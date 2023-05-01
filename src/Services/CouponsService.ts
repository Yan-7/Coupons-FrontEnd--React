import axios from "axios";
import CouponModel from "../Components/Models/CouponModel";
import { couponsStore, fetchCouponAction } from "../Components/Redux/CouponsState";
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
}

const couponsService = new CouponsService();

export default couponsService;