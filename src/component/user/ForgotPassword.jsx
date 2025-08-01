import MailOutlineIcon from "@material-ui/icons/MailOutline";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  clearErrors,
  forgotPassword,
} from "../../actions/UserActions";
import Loading from "../../more/Loader";
import MetaData from "../../more/MetaData";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">
                {message ? "Verification Link Sent Please Verify" : "Forgot Password"}
              </h2>

              {!message ? (
                <form
                  className="forgotPasswordForm"
                  onSubmit={forgotPasswordSubmit}
                >
                  <div className="forgotPasswordEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <input
                    type="submit"
                    value="Send"
                    className="forgotPasswordBtn"
                  />
                </form>
              ) : (
                <div className="emailSentBox">
                  <a
                    href="https://mail.google.com/mail/u/0/#inbox"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="goToGmailBtn"
                  >
                    Click here
                  </a>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Fragment>
  );
};

export default ForgotPassword;
