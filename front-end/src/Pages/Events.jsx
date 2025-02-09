import React, { useState, useEffect } from "react";
import { useSocket } from "../SocketContext"; // Import global socket
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventListCards from "../components/EventListCards";

const Events = () => {
  const socket = useSocket(); // Access global socket
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!socket) return;

    // Listen for new events from the server
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
      <EventListCards events={events} /> {/* Pass updated events to the component */}
      <Footer />
    </div>
  );
};

export default Events;
