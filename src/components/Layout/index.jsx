import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import './index.scss'
import Breadcrumb from "../Breadcrumbs";
import Footer from "../Footer";
import Header from "../Header";

const Layout = () => {
return (
  <>
    <div className="app">
      <Header />
      <Breadcrumb />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  </>
)
};

export default Layout;