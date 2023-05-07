import { useEffect, useState } from "react";
import "./TotalCoupons.css";
import { couponsStore } from "../../Redux/CouponsState";

function TotalCoupons(): JSX.Element {

    const[amount, setAmount] = useState<number>(0);

    useEffect(() => {
        setAmount(couponsStore.getState().coupons.length);
        const unsuscribe = couponsStore.subscribe(() => {
            setAmount(couponsStore.getState().coupons.length);
        });
        return ()=>{
            unsuscribe();
        }
    },[])
    
    return (
        <div className="TotalCoupons">
            <span> All coupons: {amount}</span>
        </div>
    );
}

export default TotalCoupons;
