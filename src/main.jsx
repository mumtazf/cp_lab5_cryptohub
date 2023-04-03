import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import NotFound from "../routes/NotFound"

//import components
import Layout from '../routes/Layout';
import DetailView  from '../routes/DetailView';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Layout />}>
          <Route index = {true} path = '/' element = {<App />}/>
          <Route index = {false} path = "/CoinDetails/:symbol" element = {<DetailView/>} />
        </Route>
        <Route path="*" element={ <NotFound /> }/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
