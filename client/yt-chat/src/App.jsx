import React from "react";
import { BrowserRouter as Router, useRoutes, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import Profile from "./components/Profile";

import Bio from "./components/Profile/Bio";
import Activity from "./components/Profile/Activity";
import Keys from "./components/Profile/Keys";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <Routing />
      </div>
    </Router>
  );
}

function Routing() {
  return useRoutes([
    { path: "/", element: <ChatArea /> },
    {
      path: "profile/*",
      element: <Profile />,
      children: [
        { path: "bio", element: <Bio /> }, // default sub route
        { path: "activity", element: <Activity /> },
        { path: "keys", element: <Keys /> },
        { index: true, element: <Navigate to="bio" /> }, // redirect from "/" to "/bio"
      ],
    },
  ]);
}

export default App;
