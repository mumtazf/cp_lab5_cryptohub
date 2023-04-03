import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;


const CoinDetails = () =>{


    
let params = useParams();
const [fullDetails, setFullDetails] = useState(null);
console.log(params)

useEffect(()=> {
    const getCoinDetails = async () => {
        const details = await fetch( `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${params.symbol}&tsyms=USD&api_key=` + API_KEY);
        console.log(params.symbol);
        const price = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?fsym=${params.symbol}&api_key=` + API_KEY);


        const detailsJson = await details.json();
        const priceJson = await price.json();
        setFullDetails({"numbers": detailsJson.DISPLAY, "textData": priceJson.Data});

    };
    getCoinDetails().catch(console.error);
},[]);

    return (
        <div>
        {fullDetails ? (
            <div>
                <h1>{fullDetails.textData[params.symbol].FullName}</h1>
                <img
                className="images"
                src={`https://www.cryptocompare.com${
                    fullDetails.numbers[params.symbol].USD.IMAGEURL
                }`}
                alt={`Small icon for ${params.symbol} crypto coin`}
                />
                <div> {fullDetails.textData[params.symbol].Description}</div>
                <br></br>
                <div>
                This coin was built with the algorithm{" "}
                {fullDetails.textData[params.symbol].Algorithm}{" "}
                </div> 
            </div>) 
                : null}
    </div>
    );
}
export default CoinDetails;