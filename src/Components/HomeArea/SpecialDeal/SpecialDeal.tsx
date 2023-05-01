import { useState } from "react";
import "./SpecialDeal.css";

function SpecialDeal(): JSX.Element {
  const [itemName, setName] = useState<string>("press button to find out...");
  const [voucherDiscount, setVoucherDiscount] = useState<number>(1);

  function getVoucher() {
    setName("here will be a product from the list");
    setVoucherDiscount(Math.floor(Math.random() * 10));
  }

  return (
    <div className="SpecialDeal Box">
      <h2>Special Deal</h2>
      <button onClick={getVoucher}>Get Discount Voucher</button>
      <p>
        <strong>Product:</strong> {itemName}
      </p>
      <p>
        <strong>Voucher Discount:</strong> {voucherDiscount}%
      </p>
    </div>
  );
}

export default SpecialDeal;
