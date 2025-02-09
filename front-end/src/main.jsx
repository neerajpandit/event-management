import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { SocketProvider } from "./SocketContext.js";
import Landing from "./Pages/Landing.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import EventDashbaord from "./Pages/EventDashbaord.jsx";
import Events from "./Pages/Events.jsx";
import Dashboard from "./Pages/Dashboard.jsx";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* <Route path="/" element={<App/>}/> */}

      <Route path="/" element={<Landing/>} />
      <Route path="/login" element={<Login/>}/>
      <Route  path="/register" element={<Signup/>}/>
      <Route path="/eventsdashboard" element={<EventDashbaord/>}/>
      <Route path="/eventspage" element={<Events/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </HelmetProvider>
  </React.StrictMode>
);
