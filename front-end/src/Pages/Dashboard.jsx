import React, { useState, useEffect } from "react";
import { useSocket } from "../SocketContext"; // Import global socket
import Navbar from "../components/Navbar";
import DashboardTable from "../components/DashboardTable";

const Dashboard = () => {
  const socket = useSocket(); // Use global socket
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!socket) return;

    // Listen for "newEvent" from the backend
    socket.on("newEvent", (eventData) => {
      console.log("New event received:", eventData);
      setEvents((prevEvents) => [...prevEvents, eventData]);
    });

    return () => {
      socket.off("newEvent"); // Cleanup listener
    };
  }, [socket]);

  return (
    <div>
      <Navbar />
      <DashboardTable events={events} />
    </div>
  );
};

export default Dashboard;
