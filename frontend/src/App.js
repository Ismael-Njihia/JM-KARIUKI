import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import  Header from "./components/Header";

function App() {
 return (
  <>
    <Header />
  <Outlet />
  <ToastContainer />
  </>
 );
}

export default App;
