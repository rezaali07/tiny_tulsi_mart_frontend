import React, { useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../cart/CheckoutSteps.jsx";
import MetaData from "../../more/MetaData";
import HomeIcon from "@material-ui/icons/Home";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { saveShippingInfo } from "../../actions/CartAction";
import BottomTab from "../../more/BottomTab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../more/Footer";
import Header from "../Home/Header";

// Static list of Nepali districts
const nepaliDistricts = [
  "Kathmandu", "Bhaktapur", "Lalitpur", "Pokhara", "Chitwan",
  "Morang", "Jhapa", "Sunsari", "Rupandehi", "Banke",
  "Kailali", "Kanchanpur", "Makwanpur", "Dang", "Parsa",
  "Bara", "Sarlahi", "Dhanusha", "Siraha", "Mahottari",
  "Nawalparasi", "Kapilvastu", "Gorkha", "Syangja", "Tanahun"
  // Add more districts if needed
];

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length !== 10) {
      toast.error("Phone Number should be 10 digits");
      return;
    }

    // ✅ Using "NP" instead of "Nepal"
    dispatch(saveShippingInfo({ address, state, country: "NP", phoneNo }));
    history.push("/order/confirm");
  };

  return (
    <>
    <Header />
      <MetaData title="Shipping Details" />
      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form className="shippingForm" onSubmit={shippingSubmit}>
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>

            <div>
              <TransferWithinAStationIcon />
              <select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">Select District</option>
                {nepaliDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={!state}
            />
          </form>
        </div>
      </div>

      <ToastContainer position="bottom-center" autoClose={5000} />
      <BottomTab />
      <Footer />
    </>
  );
};

export default Shipping;
