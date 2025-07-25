import { Rating } from "@material-ui/lab";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addItemsToCart } from "../../actions/CartAction";
import { addFavouriteItemsToCart } from "../../actions/FavouriteAction";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productActions";
import { NEW_REVIEW_RESET } from "../../constants/ProductConstants";
import BottomTab from "../../more/BottomTab";
import Footer from "../../more/Footer";
import Loading from "../../more/Loader";
import MetaData from "../../more/MetaData";
import Header from "../Home/Header";
import "./Productdetails.css";
import ReviewCard from "./ReviewCard.jsx";

const ProductDetails = ({ match, history }) => {
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { isAuthenticated } = useSelector((state) => state.user);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Calculate discounted price from offer percentage
  const discountPercent = parseFloat(product.offerPrice);
  const originalPrice = parseFloat(product.price);
  const hasDiscount = discountPercent > 0;

  const discountedPrice = hasDiscount
    ? Math.round(originalPrice - (originalPrice * discountPercent) / 100)
    : originalPrice;

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (product.stock <= quantity) return toast.error("Product stock limited");
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    if (product.stock > 0) {
      dispatch(addItemsToCart(match.params.id, quantity));
      toast.success("Product Added to cart");
    } else {
      toast.error("Product stock limited");
    }
  };

  const addToFavouriteHandler = () => {
    dispatch(addFavouriteItemsToCart(match.params.id, quantity));
    toast.success("Product Added to Favourites");
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      history.push(`/login?redirect=/product/${match.params.id}`);
      return;
    }

    if (comment.trim().length === 0) {
      toast.error("Please fill the comment box");
      return;
    }

    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));
    toast.success("Review submitted successfully! Please reload to see it.");
    dispatch({ type: NEW_REVIEW_RESET });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${product.name}`} />
          <Header />

          <div style={{ margin: "80px" }}>
            <div className="ProductDetails">
              <div className="first__varse">
                <Carousel>
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        className="CarouselImage"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    ))}
                </Carousel>

                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Rating {...options} />

                </div>

                <div className="Description">
                  <span>Description:</span>
                  <p>{product.description}</p>
                </div>
              </div>

              <div className="varse__2">
                <div className="detailsBlock-1">
                  <h2>{product.name}</h2>
                </div>

                <div className="detailsBlock">
                  <div style={{ display: "flex" }}>
                    {hasDiscount ? (
                      <>
                        <h1 style={{ color: "#266c39" }}>{`Rs.${discountedPrice}`}</h1>
                        <h1 className="discountPrice">{`Rs.${originalPrice}`}</h1>
                      </>
                    ) : (
                      <h1 style={{ color: "#266c39" }}>{`Rs.${originalPrice}`}</h1>
                    )}

                  </div>

                  <div className="detailsBlock-3-1">
                    <span className="quantity">Quantity</span>
                    <div className="detailsBlock-3-1-1">
                      <button onClick={decreaseQuantity}>-</button>
                      <input type="number" readOnly value={quantity} />
                      <button onClick={increaseQuantity}>+</button>
                    </div>
                  </div>

                  <p className="stock__meta" style={{ paddingBottom: ".5vmax" }}>
                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                      {product.stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="wishlist"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "15px 5px",
                      }}
                      onClick={addToFavouriteHandler}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-heart"
                        viewBox="0 0 16 16"
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                      </svg>
                      <span className="cartBtn">Add to wishlist</span>
                    </div>

                    <div
                      className="pointer flex"
                      style={{
                        padding: "10px 5px",
                        alignItems: "center",
                      }}
                      onClick={addToCartHandler}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-bag"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                      </svg>
                      <button className="cartBtn">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="reviews__heading">
            <h1
              style={{
                padding: "5px 30px",
                opacity: 1,
                borderBottom: "1px solid #999",
                fontFamily: "Poppins,sans-serif",
              }}
            >
              Reviews
            </h1>
          </div>
          <div>
            <div style={{ padding: "1vmax" }}>
              {product.reviews && product.reviews[0] ? (
                <div className="review__option">
                  {product.reviews &&
                    product.reviews.map((review, index) => (
                      <ReviewCard key={index} review={review} />
                    ))}
                </div>
              ) : (
                <p
                  className="noReviews"
                  style={{ fontFamily: "Poppins,sans-serif" }}
                >
                  No Reviews Yet *
                </p>
              )}

              <div
                style={{
                  padding: "0px 2vmax",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "1.8vmax",
                    fontWeight: "700",
                    lineHeight: 1,
                    letterSpacing: "-.0125em",
                    color: "#222",
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  Add a Review
                </span>
                <div
                  style={{
                    margin: "1vmax 0",
                    flexDirection: "column",
                    display: "flex",
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: "#222",
                        fontFamily: "Poppins,sans-serif",
                        padding: "1vmax 0",
                      }}
                    >
                      Your Rating*
                    </span>
                    <Rating
                      onChange={(e) => setRating(parseFloat(e.target.value))}
                      value={rating}
                      size="large"
                    />
                  </div>
                </div>
                <textarea
                  cols="30"
                  rows="6"
                  placeholder="Comment *"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    maxWidth: "100%",
                    color: "#111",
                    borderColor: "#e1e1e1",
                    background: "#fff",
                    borderRadius: "0.3rem",
                    outline: "none",
                    padding: "5px",
                    fontSize: "1.2vmax",
                    lineHeight: "1.5",
                    resize: "none",
                    display: "block",
                  }}
                ></textarea>
                <button
                  type="submit"
                  style={{
                    width: "12vmax",
                    margin: "1vmax 0px",
                    fontFamily: "sans-serif",
                    padding: "10px 15px",
                    background: "#3BB77E",
                    border: "none",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                  onClick={reviewSubmitHandler}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

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
          <BottomTab />
        </>
      )}
    </>
  );
};

export default ProductDetails;
