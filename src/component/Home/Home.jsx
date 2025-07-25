import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { getProduct } from "../../actions/productActions";
import CustomCarousel from "../../component/Home/Carousel";
import ChatSupport from "../../component/Home/chat_support";
import BottomTab from "../../more/BottomTab";
import Footer from "../../more/Footer";
import MetaData from "../../more/MetaData";
import ProductCard from "../Products/ProductCard";
import Header from "./Header";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className="loading-spinner">Tiny Tulsi Mart is on the way!!</div>
      ) : (
        <>
          <MetaData title="Tiny Tulsi Mart" />
          <Header />
          <CustomCarousel />

          <section className="featured-section">
            <h2 className="home-heading">Featured Products</h2>

            <div className="product-grid">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </section>

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
          <ChatSupport />
        </>
      )}
    </>
  );
};

export default Home;