import { Navigate, Route, Routes } from "react-router-dom";
import About from "../../AboutArea/About/About";
import Home from "../../HomeArea/Home/Home";
// import AddProduct from "../../ProductsArea/AddProduct/AddProduct";
// import EditProduct from "../../ProductsArea/EditProduct/EditProduct";
// import ProductDetails from "../../ProductsArea/ProductDetails/ProductDetails";
// import ProductList from "../../ProductsArea/ProductList/ProductList";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                {/* HOME */}
                <Route path="/home" element={<Home />} />
                {/* PRODUCTS */}
                {/* <Route path="/products" element={<ProductList />} /> */}
                {/* ABOUT */}
                <Route path="/about" element={<About />} />
                {/* Default Rout */}
                <Route path="/" element={<Navigate to={"/home"} />} />
                {/* Page Not Found */}
                <Route path="*" element={<PageNotFound />} />

                {/* <Route path="/products/details/:prodId" element={<ProductDetails />} /> */}
                
                {/* add product */}
                {/* <Route path="/products/new" element={<AddProduct />} />
                
                {/* edit product */}
                {/* <Route path="/products/edit/:prodId" element={<EditProduct />} /> */} */
            </Routes>
        </div>
    );
}

export default Routing;
