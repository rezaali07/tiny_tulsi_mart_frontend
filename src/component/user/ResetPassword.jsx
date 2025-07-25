// import React, { Fragment, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import { clearErrors, resetPassword } from "../../actions/UserActions";
// import Loading from "../../more/Loader";
// import MetaData from "../../more/MetaData";
// import LockIcon from "@material-ui/icons/Lock";
// import LockOpenIcon from "@material-ui/icons/LockOpen";
// import PasswordStrength from "../../utils/PasswordStrength"; // ✅ Import password strength component
// import "./ResetPassword.css";

// const ResetPassword = ({ history, match }) => {
//   const dispatch = useDispatch();

//   const { error, success, loading } = useSelector(
//     (state) => state.forgotPassword
//   );

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const resetPasswordSubmit = (e) => {
//     e.preventDefault();

//     const myForm = new FormData();
//     myForm.set("password", password);
//     myForm.set("passwordConfirm", confirmPassword);

//     dispatch(resetPassword(match.params.token, myForm));
//   };

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearErrors());
//     }

//     if (success) {
//       toast.success("Password Updated Successfully");
//       history.push("/login");
//     }
//   }, [dispatch, error, history, success]);

//   return (
//     <Fragment>
//       {loading ? (
//         <Loading />
//       ) : (
//         <Fragment>
//           <MetaData title="Change Password" />
//           <div className="resetPasswordContainer">
//             <div className="resetPasswordBox">
//               <h2 className="resetPasswordHeading">Update Password</h2>

//               <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
//                 <div>
//                   <LockOpenIcon />
//                   <input
//                     type="password"
//                     placeholder="New Password"
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>

//                 <div className="loginPassword">
//                   <LockIcon />
//                   <input
//                     type="password"
//                     placeholder="Confirm Password"
//                     required
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                   />
//                 </div>
//                 <input
//                   type="submit"
//                   value="Update"
//                   className="resetPasswordBtn"
//                 />
//                 {/* Show password strength only when user types */}
//                 {password.length > 0 && <PasswordStrength password={password} />}
//               </form>
//             </div>
//           </div>
//         </Fragment>
//       )}
//       <ToastContainer
//         position="bottom-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </Fragment>
//   );
// };

// export default ResetPassword;

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { clearErrors, resetPassword } from "../../actions/UserActions";
import Loading from "../../more/Loader";
import MetaData from "../../more/MetaData";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PasswordStrength from "../../utils/PasswordStrength";
import Footer from "../../more/Footer";
import Header from "../Home/Header";
import "./ResetPassword.css";

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localSuccessHandled, setLocalSuccessHandled] = useState(false);

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("passwordConfirm", confirmPassword);

    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success && !localSuccessHandled) {
      toast.success("Password Updated Successfully");
      setLocalSuccessHandled(true);

      setTimeout(() => {
        history.push("/login");
      }, 3000);
    }
  }, [dispatch, error, success, history, localSuccessHandled]);

  return (
    <Fragment>
      <MetaData title="Change Password" />
      <Header />

      {loading ? (
        <Loading />
      ) : (
        <div className="resetPasswordContainer">
          <div className="resetPasswordBox">
            <h2 className="resetPasswordHeading">Update Password</h2>

            <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
              <div>
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="loginPassword">
                <LockIcon />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Update"
                className="resetPasswordBtn"
              />

              {password.length > 0 && <PasswordStrength password={password} />}
            </form>
          </div>
        </div>
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

      <Footer />
    </Fragment>
  );
};

export default ResetPassword;
