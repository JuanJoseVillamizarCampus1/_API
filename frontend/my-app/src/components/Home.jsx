import React from "react";
import HeaderBanner from '../components/banner/banner'
import Header from '../components/header/Holi';
const Home = () => {
  return (
    <div id="main-wrapper">
      <Header/>
      <div className="page-wrapper">
          <div className="container-fluid">
              <HeaderBanner/>
          </div>  
      </div>
    </div>
  );
};

export default Home;
