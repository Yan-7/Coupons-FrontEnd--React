import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./CustomerPage.css";

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  coupons: any[]; // Adjust the type based on the Coupon entity in the backend
}

function CustomerPage(): JSX.Element {
  const [customerDetails, setCustomerDetails] = useState<Customer | null>(null);

  useEffect(() => {
    // Fetch the customer details from the backend server
    axios.get("/customer/get-customer-details")
      .then((response) => {
        // Handle success
        const details: Customer = response.data;
        setCustomerDetails(details);
      })
      .catch((error) => {
        // Handle error
        console.error("Error retrieving customer details:", error);
      });
  }, []);

  const handleBuyCoupons = () => {
    // Send a POST request to purchase a coupon
    axios.post("/customer/purchase-coupon", { couponId: 1 })
      .then(() => {
        // Handle success
        console.log("Coupon purchased successfully");
      })
      .catch((error) => {
        // Handle error
        console.error("Error purchasing coupon:", error);
      });
  };

  const handleViewCustomerCoupons = () => {
    // Send a GET request to retrieve customer coupons
    axios.get("/customer/get-customer-coupons")
      .then((response) => {
        // Handle success
        const coupons = response.data;
        console.log("Customer coupons:", coupons);
      })
      .catch((error) => {
        // Handle error
        console.error("Error retrieving customer coupons:", error);
      });
  };

  return (
    <div className="CustomerPage">
      <h2>Welcome to the customer page</h2>

        <h3>Customer details:</h3>
      {customerDetails && (
        <div className="customer-details">
          <h3>Customer Details</h3>
          <p>Name: {customerDetails.firstName} {customerDetails.lastName}</p>
          <p>Username: {customerDetails.userName}</p>
        </div>
      )}

      <div className="buttons">
        {/* <NavLink to="/customer/buy-coupons">
          <button onClick={handleBuyCoupons}>Buy Coupons</button>
        </NavLink>
        <NavLink to="/customer/view-coupons">
          <button onClick={handleViewCustomerCoupons}>View Customer Coupons</button>
        </NavLink> */}
      </div>
    </div>
  );
}

export default CustomerPage;
