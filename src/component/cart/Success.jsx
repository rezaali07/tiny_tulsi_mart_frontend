import React, { useEffect } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../actions/CartAction";
import Footer from "../../more/Footer";
import Header from "../Home/Header";
import "./Success.css"; // Import new CSS

const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear the cart after order is successfully placed
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="orderSuccess">
        <CheckCircleIcon className="successIcon" />
        <Typography className="successMessage">
          Your Order has been Placed Successfully!
        </Typography>
        <Link to="/orders" className="successLink">
          View Orders
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Success;
