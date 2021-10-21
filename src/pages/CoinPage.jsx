import React, { useEffect, useState } from "react";
import { SingleCoin } from "../api";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import CoinInfo from "../components/CoinInfo";

const CoinPage = () => {
  const [content, setContent] = useState([]);
  const { id } = useParams();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setContent(data);
    console.log(data);
  };
  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line
  }, []);

  const { name, image, market_cap_rank, market_data } = content;

  return (
    <Container>
      <Row>
        <Col lg={12} className=" info">
          <div className="details">
            <div className="group">
              <img src={image?.large} alt={name} className="details-img" />
              <h2>{name}</h2>
            </div>
            <h4 className="details-rank">
              <strong>Rank:</strong> {market_cap_rank}
            </h4>
            <h4 className="details-price">
              <strong>Current Price: </strong>
              {market_data?.current_price?.usd}
            </h4>
            <h4 className="details-cap">
              <strong>Market Cap:</strong>
              {market_data?.market_cap?.usd}
            </h4>
          </div>
        </Col>
        <Col lg={12} className=" chart">
          <CoinInfo id={id} />
        </Col>
      </Row>
    </Container>
  );
};

export default CoinPage;
