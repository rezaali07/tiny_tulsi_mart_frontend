import React from "react";
import "./ConfirmOrder.css";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../../more/MetaData";
import Footer from "../../more/Footer";
import Header from "../Home/Header";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import BottomTab from "../../more/BottomTab";

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  let productPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const subtotal = productPrice;
  const shippingCharges = productPrice > 99 ? 0 : 50;
  const totalPrice = subtotal + shippingCharges;

  // ✅ Updated here: display 'Nepal' for NP code
  const address = `${shippingInfo.address}, ${shippingInfo.state}, ${shippingInfo.country === "NP" ? "Nepal" : shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/process/payment");
  };

  return (
    <>
    <Header />

      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>

            {cartItems.length === 0 ? (
              <div className="confirmCartItemsContainer">""</div>
            ) : (
              <div className="confirmCartItemsContainer">
                {cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X Rs.{item.price} ={" "}
                      <b>Rs.{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>Rs.{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>Rs.{shippingCharges}</span>
              </div>
              <div></div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>Rs.{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
      <Footer />
      <BottomTab />
    </>
  );
};

export default ConfirmOrder;
