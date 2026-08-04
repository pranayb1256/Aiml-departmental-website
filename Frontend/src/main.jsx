import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import { Toaster } from "react-hot-toast";

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const Teaching = lazy(() => import('./pages/Teaching'));
const NonTeaching = lazy(() => import('./pages/NonTeaching'));
const HodDesk = lazy(() => import('./pages/HodDesk'));
const About = lazy(() => import('./pages/About'));
const Event = lazy(() => import('./pages/Event'));
const Academics = lazy(() => import('./pages/Academics'));
const Placements = lazy(() => import('./pages/Placements'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const TeamMember = lazy(() => import('./pages/TeamMembers'));
const Resources = lazy(() => import('./pages/Resources'));
const Showcase = lazy(() => import('./pages/Showcase'));
const CertificateVerifier = lazy(() => import('./pages/CertificateVerifier'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

// Loading Fallback Component
const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const withSuspense = (Component) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={withSuspense(Home)} />
      <Route path="/about" element={withSuspense(About)} /> 
      <Route path="/HodDesk" element={withSuspense(HodDesk)} />
      <Route path="/Teaching" element={withSuspense(Teaching)} /> 
      <Route path="/NonTeaching" element={withSuspense(NonTeaching)} /> 
      <Route path="/Event" element={withSuspense(Event)} /> 
      <Route path="/Academics" element={withSuspense(Academics)} /> 
      <Route path="/Placements" element={withSuspense(Placements)} /> 
      <Route path="/Club" element={withSuspense(TeamMember)} /> 
      <Route path="/Resources" element={withSuspense(Resources)} />
      <Route path="/Showcase" element={withSuspense(Showcase)} />
      <Route path="/verify-certificate" element={withSuspense(CertificateVerifier)} />
      <Route path="/login" element={withSuspense(Login)} />
      <Route path="/dashboard" element={<PrivateRoute element={withSuspense(Dashboard)} />} />
      {/* <Route path="login" element={<Login />} /> */}
      {/* <Route path="admin" element={<PrivateRoute element={<AdminDashboard />} />} /> */}
      {/* // Route for Error Pages  */}
      <Route path="*" element={withSuspense(NotFound)} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster  />
  </React.StrictMode>
);
