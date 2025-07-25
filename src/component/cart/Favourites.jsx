import React from "react";
import "./Favourites.css";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteFavouriteItemsToCart,
  deleteOfferFavouriteItemsToCart,
} from "../../actions/FavouriteAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/FavoriteBorder";
import { Link } from "react-router-dom";
import FavouriteItemsCard from "./FavouriteItemsCard.jsx";
import MetaData from "../../more/MetaData";
import Loading from "../../more/Loader";
import { useState } from "react";
import BottomTab from "../../more/BottomTab";
import Footer from "../../more/Footer";
import Header from "../Home/Header";


const Favourite = ({ history }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.productDetails);
  const { favouriteItems } = useSelector((state) => state.favourite);

  const deleteFavouriteItems = (id) => {
    dispatch(deleteFavouriteItemsToCart(id));
  };
 
  return (
    
    <>
    <Header />
      {loading ? (
        <Loading />
      ) : (
        <>
        
          <MetaData title="Favourites Items" />
          {favouriteItems.length === 0 ? (
            <div className="emptyCart">
              <RemoveShoppingCartIcon />
              <Typography>No Items In Favourites</Typography>
              <Link to="/products">View Products</Link>
              <BottomTab />
            </div>
          ) : (
            <>
              <div className="favouritesPage">
                <div className="favouritesHeader">
                  <p>Product</p>
                  <p>Price</p>
                  <p>Stock Status</p>
                  <p>Action</p>
                </div>
                {favouriteItems &&
                  favouriteItems.map((item) => (
                    <div className="favouritesContainer" key={item.product}>
                      <FavouriteItemsCard
                        item={item}
                        deleteFavouriteItems={deleteFavouriteItems}
                      />
                    </div>
                  ))}
                <BottomTab />
              </div>
            </>
          )}
        </>
      )}
      <Footer />
    </>
    
  );
};

export default Favourite;
