import React, { useState, useEffect } from "react";
import "./App.css";
import Ticker from "react-ticker";
import { config } from "./config";

const App = (props) => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    if (Array.isArray(props.stocks)) {
      setStocks(props.stocks);
    } else {
      //default
      setStocks([
        "AAPL",
        "GOOG",
        "AMZN",
        "FB",
        "NFLX",
        "MSFT",
        "BTC-USD",
        "AMD",
        "INTC",
        "TSLA",
        "CIBC",
        "ATVI",
      ]);
    }
  }, []);

  const Stock = (props) => {
    const [stock, setStock] = useState({
      c: 0, //close
      h: 0, //high
      l: 0, //low
      o: 0, //open
      pc: 0, //prev close
    });

    const [color, setColor] = useState("white");
    const [percent, setPercent] = useState(0);

    useEffect(() => {
      async function fetchData() {
        const response = await fetch(
          "https://finnhub.io/api/v1/quote?symbol=" +
            props.symbol +
            "&token=" +
            props.apiKey
        );
        if (response.status === 200) {
          const stockData = await response.json();
          localStorage.setItem('stock', JSON.stringify(stockData))
          setStock(stockData);
        } else {
          const stockData = JSON.parse(localStorage.getItem('stock'))
          if (stockData) {
            setStock(stockData)
          }
        };
      }
      fetchData();
    }, []);

    useEffect(() => {
      let percentDiff = (((stock.o - stock.pc) / stock.o) * 100).toFixed(1);
      if (percentDiff > 0) {
        setColor("#37C800"); //green
        percentDiff += "% ⬆";
      } else if (percentDiff === 0) {
        setColor("white");
      } else {
        setColor("#FF2F2F"); //red
        percentDiff += "% ⬇";
      }
      setPercent(percentDiff);
    }, [stock]);

    const styles = {
      whiteSpace: "nowrap",
      backgroundColor: "black",
      padding: "10px",
      color: color,
      display: "inline-block",
    };

    return (
      <span style={styles}>{`${props.symbol} ${stock.c} ${percent}`}</span>
    );
  };
  const GetStockData = (props) => {
    const stockData = props.stocks.slice(0, 10).map((stock) => {
      return <Stock symbol={stock} apiKey={props.apiKey} />;
    });
    return stockData;
  };

  return (
    <div style={{ backgroundColor: "black" }}>
      <Ticker mode={"smooth"} speed={5}>
        {() => <GetStockData stocks={stocks} apiKey={props.apiKey} />}
      </Ticker>
    </div>
  );
};

export default App;
