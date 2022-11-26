import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import './styles/style.scss';
import $ from 'jquery';
import { useEffect } from "react";
import Main from "./pages/Main";
import Stock from "./pages/Stock";
import Delivery from "./pages/Delivery";
import CardProduct from "./pages/CardProduct";
import Basket from "./pages/Basket";
import Customer from "./pages/Customer";
import Global from "./pages/Global";
import AdminPanel from "./pages/AdminPanel";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Global><Main /></Global>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/stock" element={<Global><Stock /></Global>} />
        <Route path="/delivery" element={<Global><Delivery /></Global>} />
        <Route path="/cardProduct/:id" element={<Global><CardProduct /></Global>} />
        <Route path="/basket" element={<Global><Basket /></Global>} />
        <Route path="/customer" element={<Global><Customer /></Global>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
