import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { HistoricalChart } from "../api";
import { Line } from "react-chartjs-2";
import { chartDays } from "../data";
import SelectBtn from "./SelectBtn";

const CoinInfo = ({ id }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(1);

  const fetchHistoricalData = async () => {
    setLoading(true);
    const { data } = await axios.get(HistoricalChart(id, days, "usd"));
    setLoading(false);
    setHistoricalData(data.prices);
    console.log(data.prices);
  };
  useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line
  }, [days]);

  return (
    <div>
      {loading ? (
        <div className="spinner-container">
          <Spinner animation="border" className="spinner" />
        </div>
      ) : (
        <>
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in USD`,
                  borderColor: "#38b8f3",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div className="btn-group">
            {chartDays.map((day) => {
              return (
                <SelectBtn
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectBtn>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinInfo;
