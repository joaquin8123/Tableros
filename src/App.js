import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import DetailSale from "./components/DetailSale";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginForm />} />
          <Route path="home" element={<Home />} />
          <Route path="/detail/:saleId" element={<DetailSale/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
