import { useState, useEffect } from 'react'
import './App.css'
import CoinInfo from "../Components/CoinInfo";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null)
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  
  const handleClick = () => {
    const fetchAllCoinData = async () => {
      let query = `https://min-api.cryptocompare.com/data/all/coinlist?access_key=${API_KEY}`
      const response = await fetch(query);
      const json = await response.json();

      setList(json);
      console.log(json)
      
    };

    //error handling
    fetchAllCoinData().catch(console.error);
  }

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) => 
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };

  return (
    <div className="App">
     <h1>My Crypto List</h1>
    <button onClick={handleClick}>Click here!</button>
     {/* for search */}
     <input 
        type = "text"
        placeholder='Search a coin'
        onChange = {(inputString) => searchItems(inputString.target.value)}
      />

{searchInput.length > 0
      ? filteredResults.map((coin) => 
            list.Data[coin].PlatformType === "blockchain" ? 
            <CoinInfo
              image={list.Data[coin].ImageUrl}
              name={list.Data[coin].FullName}
              symbol={list.Data[coin].Symbol}
            />
            : null
        )
      : list && Object.entries(list.Data).map(([coin]) => 
            list.Data[coin].PlatformType === "blockchain" ? 
            <CoinInfo
              image={list.Data[coin].ImageUrl}
              name={list.Data[coin].FullName}
              symbol={list.Data[coin].Symbol}
            />
            : null 
      )}
    </div>
  )
}

export default App
