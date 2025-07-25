// import LockIcon from "@material-ui/icons/Lock";
// import LockOpenIcon from "@material-ui/icons/LockOpen";
// import VpnKeyIcon from "@material-ui/icons/VpnKey";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, updatePassword } from "../../actions/UserActions";
// import { UPDATE_PASSWORD_RESET } from "../../constants/UserConstants";
// import Loading from "../../more/Loader";
// import MetaData from "../../more/MetaData";
// import PasswordStrength from "../../utils/PasswordStrength"; // Password strength component
// import "./UpdatePassword.css";

// const UpdatePassword = ({ history }) => {
//   const dispatch = useDispatch();
//   const { error, isUpdated, loading } = useSelector((state) => state.profile);

//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const updatePasswordSubmit = (e) => {
//     e.preventDefault();
//     const myForm = new FormData();
//     myForm.set("oldPassword", oldPassword);
//     myForm.set("newPassword", newPassword);
//     myForm.set("passwordConfirm", confirmPassword);
//     dispatch(updatePassword(myForm));
//   };

//   useEffect(() => {
//     if (error) {
//       alert(error);
//       dispatch(clearErrors());
//     }
//     if (isUpdated) {
//       alert("Password Updated Successfully");
//       history.push("/me");
//       dispatch({ type: UPDATE_PASSWORD_RESET });
//     }
//   }, [dispatch, error, history, isUpdated]);

//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         <>
//           <MetaData title="Change Password" />
//           <div className="updatePasswordContainer">
//             <div className="updatePasswordBox">
//               <h2 className="updatePasswordHeading">Update Password</h2>

//               <form className="updatePasswordForm" onSubmit={updatePasswordSubmit}>
//                 <div className="loginPassword">
//                   <VpnKeyIcon />
//                   <input
//                     type="password"
//                     placeholder="Old Password"
//                     required
//                     value={oldPassword}
//                     onChange={(e) => setOldPassword(e.target.value)}
//                   />
//                 </div>

//                 <div className="loginPassword">
//                   <LockOpenIcon />
//                   <input
//                     type="password"
//                     placeholder="New Password"
//                     required
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
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
//                   value="Change"
//                   className="updatePasswordBtn"
//                 />
//                 {/* Show PasswordStrength ONLY if user has typed something */}
//                 {newPassword.length > 0 && <PasswordStrength password={newPassword} />}
//               </form>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default UpdatePassword;
