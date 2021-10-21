import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Form, Table } from "react-bootstrap";

import { useHistory } from "react-router-dom";
import { CoinList } from "../api";
import Pagination from "./Pagination";

const CoinTable = () => {
  const [content, setContent] = useState([]);

  const [search, setSearch] = useState("");
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList("USD"));

    setContent(data);
  };
  useEffect(() => {
    fetchCoins();
  }, []);

  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItems - itemsPerPage;

  const handleSearch = () => {
    return content.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
      );
    });
  };

  const currentItems = handleSearch().slice(indexOfFirstItem, indexOfLastItems);

  // page number
  const pages = [];
  for (let i = 1; i <= Math.ceil(handleSearch().length / itemsPerPage); i++) {
    pages.push(i);
  }

  const numberWithComma = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="py-5">
      <Container xl="fluid">
        <Form.Control
          type="text"
          placeholder="Search for crypto currency"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Table className="table my-5" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => {
              let profit = item.price_change_percentage_24h >= 0;
              return (
                <tr
                  style={{ cursor: "pointer" }}
                  key={item.id}
                  onClick={() => history.push(`/coins/${item.id}`)}
                >
                  <td>
                    <img
                      className="table-img"
                      src={item.image}
                      alt={item.name}
                    />
                    <span className="symbol mx-2">{item.symbol}</span>
                  </td>
                  <td>{numberWithComma(item.current_price.toFixed(2))}</td>
                  <td
                    style={{ color: profit > 0 ? "rgba(14, 203, 129)" : "red" }}
                  >
                    {profit && "+"}
                    {item.price_change_percentage_24h}
                  </td>
                  <td>{numberWithComma(item.market_cap)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagination
          pages={pages}
          content={content}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Container>
    </div>
  );
};

export default CoinTable;
