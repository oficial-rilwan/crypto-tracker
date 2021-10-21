import React, { useEffect, useState } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { TrendingCoins } from "../api";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const numberWithComma = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Trending = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTrending = async () => {
    setLoading(true);
    const { data } = await axios.get(TrendingCoins("USD"));
    setLoading(false);
    setContent(data);
    console.log(data);
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, []);

  const handleDragStart = (e) => e.preventDefault();
  const items = content.map((item) => {
    let profit = item.price_change_percentage_24h >= 0;
    return (
      <Link to={`coins/${item.id}`} onDragStart={handleDragStart} key={item.id}>
        <div className="trending">
          <img className="trending-img" src={item?.image} alt={item.title} />
          <div className="py-2 d-flex">
            <span className="symbol mx-2">{item?.symbol}</span>
            <span
              className="price-24"
              style={{ color: profit > 0 ? "rgba(14, 203, 129)" : "red" }}
            >
              {profit && "+"}
              {item?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </div>
          <div className="current-price">
            {numberWithComma(item?.current_price.toFixed(2))}
          </div>
        </div>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
    768: {
      items: 4,
    },
    1024: {
      items: 6,
    },
  };
  return (
    <div>
      {loading ? (
        <div className="spinner-container">
          <Spinner animation="border" className="spinner" />
        </div>
      ) : (
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          disableDotsControls={true}
          disableButtonsControls={true}
          autoPlay={true}
          autoPlayInterval={3000}
          infinite={true}
          animationDuration={1500}
        />
      )}
    </div>
  );
};

export default Trending;
