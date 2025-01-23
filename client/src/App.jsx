import { Suspense, useState } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";

import Website from "./pages/Website";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Properties from "./pages/Properties/Properties";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Property from "./pages/Property/Property";
import Contact from "./components/Contact/contact";
import ContactForm from "./components/ContactForm/ContactForm";
import UserDetailContext from "./context/UserDetailContext";
import Bookings from "./pages/Bookings/Bookings";
import Favourites from "./pages/Favorites/Favourites";

import Login from "./pages/Login/Login";
import UploadProperty from "./pages/UploadProperty/UploadProperty";
import Leads from "./pages/Leads/Leads";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import LoginPage from "./pages/LoginPage/LoginPage";
import EnquiryForm from "./pages/EnquiryForm/EnquiryForm";
import AdminDashboard from "./pages/AdminPage/AdminPage";
import PriceBreakdown from "./components/PriceBreakdown/PriceBreakdown";

function App() {
  const queryClient = new QueryClient();

  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });

  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    description: "",
    price: 0,
    country: "",
    city: "",
    address: "",
    image: null,
    facilities: {
      bedrooms: 0,
      parkings: 0,
      bathrooms: 0,
    },
    priceBreakdown: {
      BaseRent: 0,
      Utilities: 0,
      Deposit: 0,
      CAM: 0,
    },
    userEmail: "",
  });

  const [activeStep, setActiveStep] = useState(0);
  const [opened, setOpened] = useState(false);

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/login-page" element={<LoginPage />} />
                <Route path="/enquiry-form" element={<EnquiryForm />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/contact-us" element={<Contact />} />
                <Route path="/contact-form" element={<ContactForm />} />
                <Route path="/login" element={<Login />} />
                
                {/* Add the route for PriceBreakdown */}
                <Route path="/price-breakdown" element={
                  <PrivateRoute>
                    <PriceBreakdown
                      prevStep={() => setActiveStep(activeStep - 1)}
                      propertyDetails={propertyDetails}
                      setPropertyDetails={setPropertyDetails}
                      setOpened={setOpened}
                      setActiveStep={setActiveStep}
                    />
                  </PrivateRoute>
                } />
                
                <Route path="/dashboard" element={<PrivateRoute />} />
                <Route path="/upload-property" element={
                  <PrivateRoute>
                    <UploadProperty />
                  </PrivateRoute>
                } />
                <Route path="/leads" element={
                  <PrivateRoute>
                    <Leads />
                  </PrivateRoute>
                } />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;
