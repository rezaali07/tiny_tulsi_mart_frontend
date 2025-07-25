// ... (Imports remain unchanged)
import FaceIcon from "@material-ui/icons/Face";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearErrors } from "../../actions/UserActions";
import Loader from "../../more/Loader";
import MetaData from "../../more/MetaData";
import PasswordStrength from "../../utils/PasswordStrength";
import { v4 as uuidv4 } from "uuid";
import video from "../../Assets/wallpaper/Tiny_mart_final.mp4";
import "./LoginSign.css";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { error, loading, isAuthenticated, user } = useSelector((state) => state.user);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [deviceId, setDeviceId] = useState("");

  const [loginRequiresOtp, setLoginRequiresOtp] = useState(false);
  const [loginOtp, setLoginOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { name, email, password, passwordConfirm } = userData;

  const [avatar, setAvatar] = useState("/profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");
  const [otp, setOtp] = useState("");
  const [otpLoadingReg, setOtpLoadingReg] = useState(false);
  const [showOtpStep, setShowOtpStep] = useState(false);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const isPasswordStrong = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  useEffect(() => {
    let storedId = localStorage.getItem("deviceId");
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem("deviceId", storedId);
    }
    setDeviceId(storedId);
  }, []);

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v2/login", {
        email: loginEmail,
        password: loginPassword,
        deviceId,
      });

      if (data.requiresOtp) {
        toast.info(data.message || "New device detected. Please verify OTP.");
        setLoginRequiresOtp(true);
      } else {
        dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
        localStorage.setItem("token", data.token);
        history.push("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const verifyLoginOtp = async () => {
    if (!loginOtp) {
      toast.error("Please enter the OTP");
      return;
    }
    setOtpLoading(true);
    try {
      const { data } = await axios.post("/api/v2/login/verify-login-otp", {
        email: loginEmail,
        deviceId,
        otp: loginOtp,
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
      localStorage.setItem("token", data.token);
      toast.success("Login successful");
      history.push("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    if (!isPasswordStrong(password)) {
      toast.error(
        "Password must include uppercase, lowercase, number, special character and be at least 8 characters"
      );
      return;
    }

    try {
      setOtpLoadingReg(true);
      const { data } = await axios.post("/api/v2/send-otp", { email });
      toast.success(data.message || "OTP sent to your email");
      setShowOtpStep(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setOtpLoadingReg(false);
    }
  };

  const verifyOtpAndRegister = async () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      setOtpLoadingReg(true);
      const formData = new FormData();
      formData.set("name", name);
      formData.set("email", email);
      formData.set("password", password);
      formData.set("otp", otp);
      formData.set("avatar", avatar);

      const { data } = await axios.post("/api/v2/verify-otp-register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data?.user) {
        toast.success("User registered successfully");
        dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
        localStorage.setItem("token", data.token);
        history.push("/");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setOtpLoadingReg(false);
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      if (file) reader.readAsDataURL(file);
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      if (user && user.role === "admin") {
        history.push("/dashboard");
      } else {
        history.push(redirect);
      }
    }
  }, [dispatch, error, history, isAuthenticated, user, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }

    setLoginRequiresOtp(false);
    setLoginOtp("");
    setShowOtpStep(false);
    setOtp("");
    setAvatar("/profile.png");
    setAvatarPreview("/profile.png");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Login or Signup" />
          <div className="LoginSignUpContainer">
            <video autoPlay loop muted className="background-video">
              <source src={video} type="video/mp4" />
            </video>

            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>

              {/* Login Form */}
              {!loginRequiresOtp ? (
                <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                  <div className="loginEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className="loginPassword">
                    <LockOpenIcon />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                  <Link to="/password/forgot"><span>Forget password ?</span></Link>
                  <input type="submit" value="Login" className="loginBtn" />
                  <Link to="/"><span>Login as a guest</span></Link>
                </form>
              ) : (
                <div className="loginOtpForm" style={{ padding: "1rem" }}>
                  <h3>Enter OTP sent to your email</h3>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={loginOtp}
                    onChange={(e) => setLoginOtp(e.target.value)}
                    maxLength={6}
                    required
                  />
                  <button onClick={verifyLoginOtp} disabled={otpLoading}>
                    {otpLoading ? "Verifying..." : "Verify OTP & Login"}
                  </button>
                  <button
                    style={{ marginTop: "10px", background: "gray", color: "#fff" }}
                    onClick={() => {
                      setLoginRequiresOtp(false);
                      setLoginOtp("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Register Form */}
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={showOtpStep ? (e) => e.preventDefault() : handleRegisterClick}
              >
                {!showOtpStep ? (
                  <>
                    <div className="signUpName">
                      <FaceIcon />
                      <input
                        type="text"
                        placeholder="Name"
                        required
                        name="name"
                        value={name}
                        onChange={registerDataChange}
                      />
                    </div>
                    <div className="signUpEmail">
                      <MailOutlineIcon />
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        value={email}
                        onChange={registerDataChange}
                      />
                    </div>
                    <div className="signUpPassword">
                      <LockOpenIcon />
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        name="password"
                        value={password}
                        onChange={registerDataChange}
                      />
                    </div>
                    <div className="signUpPassword">
                      <LockOpenIcon />
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        required
                        name="passwordConfirm"
                        value={passwordConfirm}
                        onChange={registerDataChange}
                      />
                    </div>
                    <div id="registerImage">
                      <img src={avatarPreview} alt="Avatar Preview" />
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={registerDataChange}
                      />
                    </div>
                    <input
                      type="submit"
                      value={otpLoadingReg ? "Sending OTP..." : "Register"}
                      className="signUpBtn"
                      disabled={otpLoadingReg}
                    />
                    {password && (
                      <div style={{ marginTop: "-10px" }}>
                        <PasswordStrength password={password} />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="otpStep">
                    <h3>Enter OTP sent to your email</h3>
                    <input
                      type="text"
                      placeholder="OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      required
                    />
                    <button onClick={verifyOtpAndRegister} disabled={otpLoadingReg}>
                      {otpLoadingReg ? "Verifying..." : "Verify OTP & Register"}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
          <ToastContainer position="bottom-center" autoClose={5000} />
        </>
      )}
    </>
  );
};

export default LoginSignup;
