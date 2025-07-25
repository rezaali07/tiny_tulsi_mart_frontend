
import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../actions/CartAction";
import { addFavouriteItemsToCart } from "../../actions/FavouriteAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  // Calculate discounted price from offer percentage
  const discountPercent = parseFloat(product.offerPrice);
  const originalPrice = parseFloat(product.price);
  const hasDiscount = discountPercent > 0;

  const discountedPrice = hasDiscount
    ? Math.round(originalPrice - (originalPrice * discountPercent) / 100)
    : originalPrice;

  const addToCartHandler = () => {
    if (product.stock > 0) {
      dispatch(addItemsToCart(product._id, 1));
      toast.success("Product added to cart");
    } else {
      toast.error("Out of stock");
    }
  };

  const addToFavouriteHandler = () => {
    dispatch(addFavouriteItemsToCart(product._id, 1));
    toast.success("Product added to favourites");
  };

  return (
    <div className="ProductCard">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.images[0].url}
          alt={product.name}
          className="ProductImg"
        />
        <p className="productName">{product.name}</p>
        <div>
          <Rating {...options} />

        </div>

        <div className="offerPriceBox">
          {hasDiscount ? (
            <>
              <span className="discountPrice">{`Rs.${discountedPrice}`}</span>
              <span className="p__Price">{`Rs.${originalPrice}`}</span>
            </>
          ) : (
            <span className="discountPrice">{`Rs.${originalPrice}`}</span>
          )}
        </div>



      </Link>

      <div className="card-buttons">
        <button className="fav-btn" onClick={addToFavouriteHandler}>
          ❤️ Wishlist
        </button>
        <button className="cart-btn" onClick={addToCartHandler}>
          🛒 Cart
        </button>
      </div>
    </div>
  );
};



export default ProductCard;
