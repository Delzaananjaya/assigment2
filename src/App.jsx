import React from "react";
import RateCurrency from "./component/RateCurrency/RateCurrency";
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <RateCurrency />
      <td>
        <p><br/>Rate are based from 1 USD. <br/> This application used API from https://currencyfreaks.com/</p>
      </td>
      </div>
  )
}
