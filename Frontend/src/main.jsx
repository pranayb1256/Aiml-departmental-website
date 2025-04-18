import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './pages/Home';
import Teaching from './pages/Teaching';
import NonTeaching from './pages/NonTeaching'
import HodDesk from "./pages/HodDesk";
import About from './pages/About';
import Event from './pages/Event';
import Academics from './pages/Academics';
import Placements from './pages/Placements';
import Dashboard from './pages/Dashboard'
import Login from './pages/Login';
import TeamMember from "./pages/TeamMembers";
import { Toaster } from "react-hot-toast";

//import for error page
import NotFound from './pages/NotFound.jsx';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} /> 
      <Route path="/HodDesk" element={<HodDesk/>} />
      <Route path="/Teaching" element={<Teaching />} /> 
      <Route path="/NonTeaching" element={<NonTeaching />} /> 
      <Route path="/Event" element={<Event/>} /> 
      <Route path="/Academics" element={<Academics/>} /> 
      <Route path="/Placements" element={<Placements/>} /> 
      <Route path="/Club" element={<TeamMember/>} /> 
      <Route path="/login" element={<Login />} />
      {/* <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} /> */}
      <Route path="/dashboard" element={<Dashboard />}/>
      {/* <Route path="login" element={<Login />} /> */}
      {/* <Route path="admin" element={<PrivateRoute element={<AdminDashboard />} />} /> */}
      {/* // Route for Error Pages  */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster  />
  </React.StrictMode>
);
