import { useSelector } from "react-redux";
import Footer from "../../more/Footer";
import Loading from "../../more/Loader";
import MetaData from "../../more/MetaData";
import Header from "../Home/Header";
import "./About.css";
// import BottomTab from "../../more/BottomTab";

const About = () => {
  const { loading } = useSelector((state) => state.profile);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="About" />
          <div>
            <Header />
            <div
              style={{
                width: "90%",
                margin: "0px auto",
                marginTop: "50px"
              }}
            >
              <div className="about__page">
                {/* 1st verse */}
                <div className="row flex">
                  <div className="col__2">
                    <img src="https://res.cloudinary.com/dig1ixe4q/image/upload/v1753152246/about_ksnfyo.jpg" />
                  </div>
                  <div className="col__2">
                    <div className="meta">
                      <span
                        style={{
                          fontSize: "40px",
                          fontWeight: "700",
                          lineHeight: "1.2",
                          color: "#266c39",

                        }}
                      >
                        👶 Welcome to Tiny Tulsi Mart                      </span>
                    
                      <h2>
                        At Tiny Tulsi Mart, we believe that every baby deserves a gentle, loving start to 
                        life — one that’s pure, safe, and filled with care, just like the sacred Tulsi 
                        plant in every Nepali home.
                        Born from a mother’s intuition and rooted in tradition, our store brings you carefully 
                        curated baby essentials — from soft clothing and natural skincare to toys, feeding 
                        accessories, and more — all with a focus on purity, safety, and comfort.
                      </h2>

                      <h3>
                        🌿 Why “Tulsi”?
Tulsi, known as the “Queen of Herbs,” represents purity, protection, and wellness — values we hold close when it comes to caring for babies. Just as Tulsi is lovingly nurtured in homes, so are our little ones.

That’s the spirit behind Tiny Tulsi Mart — where every product is chosen with the same love and caution a mother would offer her child.
                      </h3>

                      <h2>
                        🛍️ What You’ll Find at Tiny Tulsi Mart:
                      </h2>
                      <h3>
                        Organic & chemical-free baby care products
                      </h3>

                      <h3>
                        Feeding & nursing essentials
                      </h3>
                      <h3>
                        Traditional wellness items inspired by Nepali care rituals
                      </h3>
                      <h3>
                        Thoughtfully designed toys & gifts
                      </h3>


                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
          {/* <BottomTab /> */}
        </>
      )}
    </>
  );
};

export default About;
