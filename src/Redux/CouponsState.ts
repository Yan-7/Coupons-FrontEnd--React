import CouponModel from "../Models/CouponModel";
import { createStore } from "redux";

export class CouponsState {
    public coupons: CouponModel[] = [];
}

export enum CouponsActionEnum {
    FetchCoupons,
    AddCoupon,
    UpdateCoupon,
    DeleteCoupon
}

type FetchCouponsAction = {
    type: CouponsActionEnum.FetchCoupons
    payload: CouponModel[];
}

type AddCouponAction = {
    type: CouponsActionEnum.AddCoupon
    payload: CouponModel;
}

type UpdateCouponAction = {
    type: CouponsActionEnum.UpdateCoupon
    payload: CouponModel;
}

type DeleteCouponAction = {
    type: CouponsActionEnum.DeleteCoupon
    payload: number;
}

export type CouponAction = FetchCouponsAction | AddCouponAction | UpdateCouponAction | DeleteCouponAction;

export function fetchCouponAction(coupons: CouponModel[]): FetchCouponsAction {
    return {type: CouponsActionEnum.FetchCoupons, payload:coupons};
}

export function addCouponAction(coupon:CouponModel): AddCouponAction {
    return {type: CouponsActionEnum.AddCoupon,payload:coupon};
}

export function updateCouponAction(coupon:CouponModel): UpdateCouponAction {
    return {type:CouponsActionEnum.UpdateCoupon, payload:coupon};
}

export function deleteCouponAction(id:number): DeleteCouponAction {
    return{type: CouponsActionEnum.DeleteCoupon, payload:id}    
}

export function couponReducer(currentState: CouponsState = new CouponsState(), action: CouponAction): CouponsState {
    
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
