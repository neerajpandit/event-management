

import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to install axios

const EventTable = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedEvent, setEditedEvent] = useState(null);
  const [userId, setUserId] = useState(""); // state to hold userId

  useEffect(() => {
    // Retrieve userId from localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Fetch events by userId
  useEffect(() => {
    if (userId) {
      const fetchEvents = async () => {
        try {
          const response = await axios.get(`http://localhost:8001/api/v1/events/getlist/${userId}`);
          if (response.data && response.data.data) {
            setEvents(response.data.data); // Set the fetched events in the state
          }
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };
      fetchEvents();
    }
  }, [userId]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleEdit = (eventId) => {
    const eventToEdit = events.find(event => event._id === eventId);
    setEditingIndex(eventId);
    setEditedEvent({ ...eventToEdit });
  };
  
 const handleSave = async () => {
  try {
    const updatedEvent = editedEvent;
    const token = localStorage.getItem('accessToken');

    const response = await axios.put(
      `http://localhost:8001/api/v1/events/update/${updatedEvent._id}`,
      updatedEvent,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data && response.data.status === 'success') {
      // Update the event in the state immediately
      const updatedEvents = events.map(event =>
        event._id === updatedEvent._id ? { ...event, ...updatedEvent } : event
      );
      setEvents(updatedEvents); // Update the events array
      setEditingIndex(null); // Reset the editing mode
      setEditedEvent(null);  // Clear the edited event
    } else {
      console.error("Failed to update event:", response.data.message);
    }
  } catch (error) {
    console.error("Error updating event:", error);
  }
};

  

const handleDelete = async (id) => {
  try {
    // Retrieve the access token from localStorage
    const token = localStorage.getItem('accessToken');

    if (!token) {
      alert('Access token is required');
      return;
    }

    const response = await fetch(`http://localhost:8001/api/v1/events/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    

    const data = await response.json();
    if (response.status === 200) {
      alert(data.message);
      // Optionally update the UI after deletion (e.g., remove the event from the list)
      // Here, you can update the events state if you have a list of events
      setEvents(prevEvents => prevEvents.filter(event => event._id !== id));
    } else {
      alert(data.message || 'Error deleting event');
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    alert('Error deleting event');
  }
};




  const filteredEvents = events
    .filter((event) => {
      const isUpcoming = new Date(event.date) > new Date();
      return filter === "all" || (filter === "upcoming" && isUpcoming) || (filter === "past" && !isUpcoming);
    })
    .sort((a, b) => {
      return sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });

  return (
    <div className="p-4 bg-[#F3E8FF] mt-6">
      <div className="mb-4 flex gap-4">
        <div>
          <label className="mr-2 font-semibold">Filter:</label>
          <select value={filter} onChange={handleFilterChange} className="border p-2 rounded-md">
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming Events</option>
            <option value="past">Past Events</option>
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold">Sort by Date:</label>
          <select value={sortOrder} onChange={handleSortChange} className="border p-2 rounded-md">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 border border-gray-300">S.No</th>
              <th className="px-6 py-3 border border-gray-300">Event Name</th>
              <th className="px-6 py-3 border border-gray-300">Event Description</th>
              <th className="px-6 py-3 border border-gray-300">Date</th>
              <th className="px-6 py-3 border border-gray-300">Time</th>
              <th className="px-6 py-3 border border-gray-300">Status</th>
              <th className="px-6 py-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
          {filteredEvents.map((event) => {
  const isUpcoming = new Date(event.date) > new Date();
  return (
    <tr key={event._id} className="text-center border border-gray-300">
      <td className="px-6 py-4 border border-gray-300">{filteredEvents.findIndex(e => e._id === event._id) + 1}</td>
      <td className="px-6 py-4 border border-gray-300">
        {editingIndex === event._id ? (
          <input
            type="text"
            value={editedEvent.name}
            onChange={(e) => setEditedEvent({ ...editedEvent, name: e.target.value })}
            className="border p-1 rounded-md"
          />
        ) : (
          event.name
        )}
      </td>
      <td className="px-6 py-4 border border-gray-300">
        {editingIndex === event._id ? (
          <input
            type="text"
            value={editedEvent.description}
            onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
            className="border p-1 rounded-md"
          />
        ) : (
          event.description
        )}
      </td>
      <td className="px-6 py-4 border border-gray-300">
        {editingIndex === event._id ? (
          <input
            type="date"
            value={editedEvent.date}
            onChange={(e) => setEditedEvent({ ...editedEvent, date: e.target.value })}
            className="border p-1 rounded-md"
          />
        ) : (
          event.date
        )}
      </td>
      <td className="px-6 py-4 border border-gray-300">
        {editingIndex === event._id ? (
          <input
            type="time"
            value={editedEvent.time}
            onChange={(e) => setEditedEvent({ ...editedEvent, time: e.target.value })}
            className="border p-1 rounded-md"
          />
        ) : (
          event.time
        )}
      </td>
      <td className="px-6 py-4 border border-gray-300">
        <span className={`px-3 py-1 rounded-md text-xs font-semibold ${isUpcoming ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {isUpcoming ? "Upcoming" : "Past"}
        </span>
      </td>
      <td className="px-6 py-4 border border-gray-300">
        {editingIndex === event._id ? (
          <button className="px-3 py-1 mr-2 bg-green-500 text-white text-xs font-semibold rounded-md hover:bg-green-600" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="px-3 py-1 mr-2 bg-blue-500 text-white text-xs font-semibold rounded-md hover:bg-blue-600" onClick={() => handleEdit(event._id)}>
            Edit
          </button>
        )}
        <button className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-md hover:bg-red-600" onClick={() => handleDelete(event._id)}>
          Delete
        </button>
      </td>
    </tr>
  );
})}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventTable;
