A lightweight react component that gets stock data periodically and displays a list of stocks that crawls from right to left.
It uses the Finnhub API (https://finnhub.io/docs/api) to fetch the stock data, hence, an api key is needed to use this component which will be passed in through props.

## Getting Started

1. Install the package
`npm install react-stock-crawler`

2. Install peer dependencies
`npm install react-ticker`

# Props
- `stocks` A list of stocks represented by their ticker symbol
- `apiKey` Your api key to use the [Finnhub API](https://finnhub.io/docs/api)

## Example Usage
```
import StockCrawler from 'react-stock-crawler/dist'

function App() {
  return (
    <StockCrawler stocks={['AAPL', 'MSFT']} apiKey={"API_KEY"} />
  );
}

export default App;

```
