// eslint-disable-next-line
import DehazeIcon from "@material-ui/icons/Dehaze";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import HomeIcon from "@material-ui/icons/Home";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./BottomTab.css";

const BottomTab = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { favouriteItems } = useSelector((state) => state.favourite);

  return (
    <>
      <div className="bottomOption">
        <Link to="/">
          <HomeIcon
            style={{
              color: "white",
              fontSize: "35px",
              margin: "5px",
              opacity: ".8",
            }}
          />
        </Link>
        <Link to="/search">
          <SearchIcon
            style={{
              color: "white",
              fontSize: "35px",
              margin: "5px",
            }}
          />
        </Link>
        <Link to="/cart">
          <div
            style={{
              position: "relative",
            }}
          >
            <LocalMallIcon
              style={{
                color: "white",
                fontSize: "35px",
                margin: "5px",
                opacity: ".8",
              }}
            />

            <span
              style={{
                position: "absolute",
                bottom: "70%",
                left: "10%",
                height: "20px",
                width: "20px",
                border: "none",
                background: "#266c39",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                color: "white",
                fontWeight: "700",
              }}
            >
              {cartItems.length}
            </span>
          </div>
        </Link>
        <Link to="/favourites">
          <div
            style={{
              position: "relative",
            }}
          >
            <FavoriteBorderIcon
              style={{
                color: "white",
                fontSize: "35px",
                margin: "5px",
                opacity: ".8",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: "70%",
                left: "10%",
                height: "20px",
                width: "20px",
                border: "none",
                background: "#266c39",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                color: "white",
                fontWeight: "400",
              }}
            >
              {favouriteItems.length}
            </span>
          </div>
        </Link>
        <Link to="/me">
          <PersonIcon
            style={{
              color: "white",
              fontSize: "35px",
              margin: "5px",
              opacity: ".8",
            }}
          />
        </Link>
        <Link to="/more">
          <DehazeIcon
            style={{
              color: "white",
              fontSize: "35px",
              margin: "5px",
              opacity: ".8",
            }}
          />
        </Link>
      </div>
    </>
  );
};

export default BottomTab;
