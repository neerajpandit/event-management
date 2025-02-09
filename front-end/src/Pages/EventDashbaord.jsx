import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import EventCreate from '../components/EventCreate';
import EventTable from '../components/EventTable';

const EventDashboard = () => {
  const [events, setEvents] = useState([]);

  const addEvent = (eventData) => {
    setEvents([...events, eventData]);
  };

  return (
    <div>
      <Navbar />
      <EventCreate addEvent={addEvent} />
      <EventTable events={events} setEvents={setEvents} />
    </div>
  );
};

export default EventDashboard;
