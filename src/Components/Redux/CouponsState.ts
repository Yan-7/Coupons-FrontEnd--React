import { create } from "domain";
import CouponModel from "../Models/CouponModel";
import { createStore } from "redux";

export class CouponsState {
    public coupons: CouponModel[] = [];
}

enum CouponsActionEnum {
    FetchCoupons,
    AddCoupon,
    UpdateCoupon,
    DeleteCoupon
}
export default CouponsActionEnum;

export interface CouponInterface {
    type: CouponsActionEnum
    payload: any;
}

export function fetchCouponAction(coupons: CouponModel[]): CouponInterface {
    return {type: CouponsActionEnum.FetchCoupons, payload:coupons};
}

export function addCouponAction(coupon:CouponModel): CouponInterface {
    return {type: CouponsActionEnum.AddCoupon,payload:coupon};
}
export function updateCouponAction(coupon:CouponModel): CouponInterface {
    return {type:CouponsActionEnum.UpdateCoupon, payload:coupon};
}
export function DeleteCouponAction(coupon:CouponModel): CouponInterface {
    return{type: CouponsActionEnum.DeleteCoupon, payload:coupon}    
}

export function couponReducer(currentState: CouponsState = new CouponsState(), action: CouponInterface): CouponsState {
    
    const newState = {...currentState};

    switch (action.type) {
        
        case CouponsActionEnum.FetchCoupons:
            newState.coupons = action.payload;
            break;
        case CouponsActionEnum.AddCoupon:
            newState.coupons.push(action.payload);
            break;
        case CouponsActionEnum.UpdateCoupon:
            const indexToUpdate = newState.coupons.findIndex(c => c.id === action.payload.id);
            if (indexToUpdate >= 0) newState.coupons[indexToUpdate] = action.payload;
            break;
        case CouponsActionEnum.DeleteCoupon:
            const indexToDelete = newState.coupons.findIndex(c => c.id === action.payload);
            if (indexToDelete>=0) newState.coupons.splice(indexToDelete,1);
            break
    
        default:
            break;
    }

    return newState;
}

export const couponsStore = createStore(couponReducer);

