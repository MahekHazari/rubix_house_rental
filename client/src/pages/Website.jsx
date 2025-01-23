import React from 'react'
import Companies from "../components/Companies/Companies";
import Contact from "../components/Contact/contact";
import Footer from "../components/Footer/Footer";
import GetStarted from "../components/GetStarted/GetStarted";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Residencies from "../components/Residencies/Residencies";
import Value from "../components/Value/Value";
import ContactPage from './contact/contact';
import ContactForm from './ContactForm/ContactForm';

import Login from "./Login/Login";
import UploadProperty from "./UploadProperty/UploadProperty";
import Leads from "./Leads/Leads";

import Bookings from './Bookings/Bookings';

import PrivateRoute from "./PrivateRoute/PrivateRoute";

const Website = () => {
  return (
    <div className="App">
    <div>
      <div className="white-gradient" />
      <Hero />
    </div>
    
    
    
    <PrivateRoute/>
 
    
    <Contact/>
    
    
    <Companies />
    <Residencies/>
    <Value/>
    <Contact/>
    <GetStarted/>
    <Footer/>
  </div>
  )
}

export default Website