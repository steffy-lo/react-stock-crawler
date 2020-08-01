import React, { useState, useEffect } from 'react';
import './App.css';
import Ticker from 'react-ticker';
import { config } from './config';

const App = (props) => {

  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    setStocks(['AAPL', 'GOOG'])
  }, []);

  const Stock = (props) => {
    const [stock, setStock] = useState({
      "c": 0,
      "h": 0,
      "l": 0,
      "o": 0,
      "pc": 0
    });

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('https://finnhub.io/api/v1/quote?symbol=' + props.symbol + '&token=' + props.apiKey);
        const stockData = await response.json();
        console.log(stockData)
        setStock(stockData);
      }
      fetchData();
    }, []);

    return(
      <div>
        Open: {stock.o} 
        High: {stock.h} 
        Low: {stock.l}
        Current: {stock.c}
        Previous Close: {stock.pc}
      </div>
    )

  };

  const GetStockData = (props) => {
    const stockData = props.stocks.map(stock => <Stock symbol={stock} apiKey={config.apiKey}/>);
    return(
      stockData
    );
  };

  return (
    <div>
      <Ticker speed={10}>
        {() => <GetStockData stocks={stocks}/>}
      </Ticker>
    </div>
  );
};

export default App;
