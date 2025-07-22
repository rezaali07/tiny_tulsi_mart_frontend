import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import { loadUser } from "./actions/UserActions";
import "./App.css";

import About from "./component/about/About";
import AllOrder from "./component/Admin/AllOrder";
import AllProducts from "./component/Admin/AllProducts";
import AllReviews from "./component/Admin/AllReviews";
import AllUsers from "./component/Admin/AllUsers";
import CreateProduct from "./component/Admin/CreateProduct";
import Dashboard from "./component/Admin/Dashboard";
import EditProduct from "./component/Admin/EditProduct";
import UpdateOrder from "./component/Admin/UpdateOrder";
import UpdateUser from "./component/Admin/UpdateUser";
import LoginSign from "./component/Authentication/LoginSign";
import Cart from "./component/cart/Cart";
import ConfirmOrder from "./component/cart/ConfirmOrder";
import Favourite from "./component/cart/Favourites";
import Payment from "./component/cart/Payment";
import Shipping from "./component/cart/Shipping";
import Success from "./component/cart/Success";
import Home from "./component/Home/Home";
import productDetails from "./component/Products/ProductDetails";
import Products from "./component/Products/products";
import Search from "./component/Products/Search";
import EditProfile from "./component/user/EditProfile";
import ForgotPassword from "./component/user/ForgotPassword";
import MoreOption from "./component/user/MoreOption";
import MyOrder from "./component/user/MyOrder";
import MyOrderDetails from "./component/user/MyOrderDetails";
import Profile from "./component/user/Profile";
import ResetPassword from "./component/user/ResetPassword";
import UpdatePassword from "./component/user/UpdatePassword";
import CommingSoon from "./more/CommingSoon";
import Contact from "./more/Contact";
import Loading from "./more/Loader";
import Notfound from "./more/Notfound";
import Rules from "./more/Rules";
import Support from "./more/Support";
import UserData from "./more/UserData";
import ProtectedRoute from "./route/ProtectedRoute";
import Store from "./Store";
import ActiveSessions from "./component/user/ActiveSessions";
import AdminAuditLogs from "./component/Admin/AdminAuditLogs";
import AccountSettings from "./component/settings/AccountSettings";

import axiosInstance, { setCsrfToken } from "./utils/axiosInstance";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  // Fetch CSRF token once on app load
  useEffect(() => {
    axiosInstance
      .get("/csrf-token")
      .then((res) => {
        const token = res.data.csrfToken;
        console.log("🔐 CSRF Token:", token);
        setCsrfToken(token);

        // ✅ Attach CSRF token to all axios requests
        axiosInstance.defaults.headers.common["X-CSRF-Token"] = token;
      })
      .catch((err) => console.error("Failed to fetch CSRF token", err));
  }, []);

  // Fetch Stripe API key from backend
  async function getStripeApiKey() {
    try {
      const { data } = await axiosInstance.get("/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe API key", error);
    }
  }

  // Load fonts, user data, and Stripe API key once on mount
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    Store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      {isAuthenticated && <UserData user={user} />}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={productDetails} />
        <Route exact path="/load" component={Loading} />
        <Route exact path="/login" component={LoginSign} />
        <Route exact path="/about" component={About} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/products/:keyword" component={Products} />
        <Route exact path="/support" component={Support} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/favourites" component={Favourite} />
        <Route exact path="/more" component={MoreOption} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/faq" component={Rules} />
        <Route exact path="/creator" component={CommingSoon} />

        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/success" component={Success} />

        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />

        <ProtectedRoute exact path="/me" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdatePassword} />
        <ProtectedRoute exact path="/settings" component={AccountSettings} />

        <ProtectedRoute exact path="/me/sessions" component={ActiveSessions} />
        <ProtectedRoute exact path="/me/update/profile" component={EditProfile} />
        <ProtectedRoute exact path="/orders" component={MyOrder} />
        <ProtectedRoute exact path="/order/:id" component={MyOrderDetails} />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product"
          component={CreateProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/products"
          component={AllProducts}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/edit/product/:id"
          component={EditProduct}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/orders"
          component={AllOrder}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/order/:id"
          component={UpdateOrder}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/users"
          component={AllUsers}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/user/:id"
          component={UpdateUser}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/reviews"
          component={AllReviews}
        />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/audit-logs"
          component={AdminAuditLogs}
        />

        <Route
          component={
            window.location.pathname === "/process/payment" ? null : Notfound
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
