import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearErrors,
  sendUpdatePasswordOtp,
  verifyUpdatePasswordOtp,
} from "../../../actions/UserActions";
import { UPDATE_PASSWORD_RESET } from "../../../constants/UserConstants";
import PasswordStrength from "../../../utils/PasswordStrength";
import Modal from "./ReusableModal";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { error, isUpdated } = useSelector((state) => state.profile);

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [oldPassword, setOldPassword] = useState(""); 
  const [newPassword, setNewPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Reset all states on modal open
  useEffect(() => {
    if (isOpen) {
      console.log("[ChangePasswordModal] Modal opened - resetting states");
      dispatch({ type: UPDATE_PASSWORD_RESET });
      setOtpSent(false);
      setOtp("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setFormSubmitted(false);
    }
  }, [isOpen, dispatch]);

  // Handle error & success from redux state
  useEffect(() => {
    console.log("[ChangePasswordModal] useEffect triggered", {
      error,
      isUpdated,
      otpSent,
      formSubmitted,
    });

    if (error) {
      console.log("[ChangePasswordModal] Error detected:", error);
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated && otpSent && formSubmitted) {
      console.log("[ChangePasswordModal] Password update successful");
      toast.success("Password updated successfully");
      dispatch({ type: UPDATE_PASSWORD_RESET });

      // Reset form and close modal
      setOtpSent(false);
      setOtp("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setFormSubmitted(false);
      onClose();
    }
  }, [dispatch, error, isUpdated, otpSent, formSubmitted, onClose]);

  // Send OTP handler
  const handleSendOtp = async () => {
    console.log("[ChangePasswordModal] handleSendOtp called");
    await dispatch(sendUpdatePasswordOtp());
    console.log("[ChangePasswordModal] OTP sent successfully");
    setOtpSent(true);
    toast.info("OTP sent to your email.");
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("[ChangePasswordModal] handleSubmit called", {
      otp,
      oldPassword,
      newPassword,
      confirmPassword,
    });

    if (!otp || !oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    setFormSubmitted(true);
    dispatch(
      verifyUpdatePasswordOtp({
        otp,
        oldPassword,
        newPassword,
        passwordConfirm: confirmPassword,
      })
    );
    console.log("[ChangePasswordModal] verifyUpdatePasswordOtp dispatched");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Password">
      {!otpSent ? (
        <button onClick={handleSendOtp} type="button">
          Send OTP to Email
        </button>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label>
            OTP:
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </label>

          <label>
            Old Password:
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </label>

          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>

          {newPassword.length > 0 && <PasswordStrength password={newPassword} />}

          <label>
            Confirm New Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit">Update Password</button>
        </form>
      )}
    </Modal>
  );
};

export default ChangePasswordModal;
