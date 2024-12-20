import React from "react";
import axios from 'axios'; 
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Protected } from "./ProtectedRoute/ProtectedRoute";
import HomePage from "./components/site/pages/HomePage"
import ContactPage from "./components/site/pages/ContactPage"
import RegisterPage from "./components/site/pages/RegisterPage"
import LoginPage from "./components/site/pages/LoginPage"
import StoreProfile from "./components/site/pages/StoreProfile"
import BookingSubmit from "./components/site/pages/BookingSubmit"
import ThankYouPage from "./components/site/pages/ThankYouPage"
import ResetPassword from "./components/site/pages/ResetPassword"
import ForgetPassword from "./components/site/pages/ForgetPassword"

import MyBookings from "./components/dashboard/pages/MyBookings"
import AccountSettings from "./components/dashboard/pages/AccountSettings"

import Dashboard from "./components/dashboard/Dashboard"
import Appointments from "./components/dashboard/pages/Appointments"
import TimeSlots from "./components/dashboard/pages/TimeSlots"
import Settings from "./components/dashboard/pages/Settings"
import PrimarySettings from "./components/dashboard/pages/PrimarySettings"
import Users from "./components/dashboard/pages/Users"
import AddNewUser from "./components/dashboard/pages/AddNewUser"
import AddSchools from "./components/dashboard/pages/StoreSchools"
import UnavailableDates from "./components/dashboard/pages/UnavailableDates"

import StoreRegister from "./components/admin/pages/StoreRegister"
import StoreList from "./components/admin/pages/StoreList"
import StorePasswordReset from "./components/admin/pages/StorePasswordReset"

//axios.defaults.baseURL = 'http://127.0.0.1:8000/';
//axios.defaults.baseURL = 'https://api.dev-booking-tus.it.sas.co.nz/'
axios.defaults.baseURL = 'http://api.booking.theuniformshoppe.co.nz/';
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.headers.post['Accept'] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

const theme = createTheme({
  typography: {
      fontFamily: "Poppins",
      fontWeightLight: 300,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Routes>

        <Route exact path={"/"} element={<HomePage />} />
        <Route exact path={"/contact"} element={<ContactPage />} />
        <Route exact path={"/register"} element={<RegisterPage />} />
        <Route exact path={"/login"} element={<LoginPage />} />
        <Route exact path={"/:slug"} element={<StoreProfile />} />
        <Route exact path={"/booking-submit"} element={<BookingSubmit />} />
        <Route exact path={"/thank-you/:appoinmentid"} element={<ThankYouPage />} />

        <Route exact path={"/forget-password"} element={<ForgetPassword />} />
        <Route exact path={"/reset-password/:token"} element={<ResetPassword />} />

        <Route exact path={"/my-bookings"} element={<Protected component={MyBookings} />} />
        <Route exact path={"/account-settings"} element={<Protected component={AccountSettings} />} />
        
        {/* Admin Routes */}
        <Route exact path={"/admin"} element={<Protected component={Dashboard} />} />
        <Route exact path={"/admin/appointments"} element={<Protected component={Appointments} />} />
        <Route exact path={"/admin/time-slots"} element={<Protected component={TimeSlots} />} />
        <Route exact path={"/admin/store-settings"} element={<Protected component={Settings} />} />
        <Route exact path={"/admin/primary-settings"} element={<Protected component={PrimarySettings} />} />
        <Route exact path={"/admin/users"} element={<Protected component={Users} />} />
        <Route exact path={"/admin/add-new-user"} element={<Protected component={AddNewUser} />} />
        <Route exact path={"/admin/add-schools"} element={<Protected component={AddSchools} />} />
        <Route exact path={"/admin/add-unavailable-dates"} element={<Protected component={UnavailableDates} />} />

        <Route exact path={"/admin/store-register"} element={<Protected component={StoreRegister} />} /> 
        <Route exact path={"/admin/store-list"} element={<Protected component={StoreList} />} /> 
        <Route exact path={"/admin/store-reset/:id"} element={<Protected component={StorePasswordReset} />} /> 

        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
