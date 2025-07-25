import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/productActions";
import Pagination from "react-js-pagination";
import "./Product.css";
import Typography from "@material-ui/core/Typography";
import MetaData from "../../more/MetaData";
import BottomTab from "../../more/BottomTab";
import Header from "../Home/Header";
import Footer from "../../more/Footer";

const categories = [
  "Tooth Care",
    "Blankets Wrappers & Bedding set",
    "Kids Toys and Accessories",
    "Lotions and Creams",
    "Kids Wears",
    "Feeding Essentials",
    "Footwear",
    "Bath & Skincare",
    "Health & Safety",
    "Baby Gift Sets",
    "Strollers & Car Seats",
    "Baby Clothing",
    "Sport wear",
];

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, category));
  }, [dispatch, keyword, currentPage, category, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Products" />
          <Header />

          <div className="products-page-container">
            {/* Filter Section */}
            <div className="filter-bar">
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="category-dropdown"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <p className="category-status">
                {category
                  ? `Filtering by: ${category}`
                  : "Showing all categories"}
              </p>
            </div>

            {/* Product Section */}
            <div className="product-section">
              <h2 className="section-title">
                {products.length > 0 ? "Featured Products" : "No Products Found"}
              </h2>
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {resultPerPage < productsCount && (
                <div className="pagination-wrapper">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="First"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </div>
          </div>

          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Products;