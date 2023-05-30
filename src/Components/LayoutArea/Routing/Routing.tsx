
import { Navigate, Route, Routes } from "react-router-dom";
import About from "../../AboutArea/About/About";
import Home from "../../HomeArea/Home/Home";
// import AddProduct from "../../ProductsArea/AddProduct/AddProduct";
// import EditProduct from "../../ProductsArea/EditProduct/EditProduct";
// import ProductDetails from "../../ProductsArea/ProductDetails/ProductDetails";
// import ProductList from "../../ProductsArea/ProductList/ProductList";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";
import CouponsList from "../../CouponsArea/CouponsList/CouponsList";
import AddCoupon from "../../CouponsArea/AddCoupon/AddCoupon";
import CouponDetails from "../../CouponsArea/CouponDetails/CouponDetails";
import EditCoupon from "../../CouponsArea/EditCoupon/EditCoupon";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Logout from "../../AuthArea/Logout/Logout";
import CustomerPage from "../Customer/CustomerPage/CustomerPage";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                
                <Route path="/home" element={<Home />} />
                
                <Route path="/coupons" element={<CouponsList />} />
                
                <Route path="/about" element={<About />} />
                
                <Route path="/" element={<Navigate to={"/home"} />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element= {<Register/>} />

                <Route path="/logout" element= {<Logout/>} />

                <Route path="/coupons/details/:couponId" element={<CouponDetails />} />
                
                <Route path="/coupons/new" element={<AddCoupon/>} />
                
                <Route path="/coupons/edit/:couponsId" element={<EditCoupon />} /> 
                
                <Route path="*" element={<PageNotFound />} />

                <Route path="/customer/customer-page" element= {<CustomerPage/>} />

            </Routes>
        </div>
    );
}

export default Routing;
 