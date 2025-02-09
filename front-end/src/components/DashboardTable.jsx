import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardTable = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedEvent, setEditedEvent] = useState({
    name: "",
    organizer: "",
    description: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/v1/events/getalllist");
        console.log("API Response:", response); // Debugging API response
        // Now accessing the events from response.data.data since it is nested
        if (response.data && Array.isArray(response.data.data)) {
          setEvents(response.data.data); // Corrected to access 'data' property
          setFilteredEvents(response.data.data);
        } else {
          console.error("Unexpected API response structure", response.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedEvent(filteredEvents[index]);
  };

  const handleSave = (index) => {
    const updatedEvents = [...filteredEvents];
    updatedEvents[index] = editedEvent;
    setFilteredEvents(updatedEvents);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    const updatedEvents = filteredEvents.filter((_, i) => i !== index);
    setFilteredEvents(updatedEvents);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Event Dashboard</h1>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="text-center bg-gray-200">
            <th className="px-6 py-4 border border-gray-300">No</th>
            <th className="px-6 py-4 border border-gray-300">Event Name</th>
            <th className="px-6 py-4 border border-gray-300">Organizer</th>
            <th className="px-6 py-4 border border-gray-300">Description</th>
            <th className="px-6 py-4 border border-gray-300">Date</th>
            <th className="px-6 py-4 border border-gray-300">Time</th>
            <th className="px-6 py-4 border border-gray-300">Status</th>
            <th className="px-6 py-4 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => {
              const isUpcoming = new Date(event.date) > new Date();
              return (
                <tr key={index} className="text-center border border-gray-300">
                  <td className="px-6 py-4 border border-gray-300">{index + 1}</td>
                  <td className="px-6 py-4 border border-gray-300">
                    {editingIndex === index ? (
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
                  <td className="px-6 py-4 border border-gray-300">{event.organizer}</td>
                  <td className="px-6 py-4 border border-gray-300">{event.description}</td>
                  <td className="px-6 py-4 border border-gray-300">{event.date}</td>
                  <td className="px-6 py-4 border border-gray-300">{event.time}</td>
                  <td className="px-6 py-4 border border-gray-300">
                    <span className={`px-3 py-1 rounded-md text-xs font-semibold ${isUpcoming ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {isUpcoming ? "Upcoming" : "Past"}
                    </span>
                  </td>
                  <td className="px-6 py-4 border border-gray-300">
                    {editingIndex === index ? (
                      <button className="px-3 py-1 mr-2 bg-green-500 text-white text-xs font-semibold rounded-md hover:bg-green-600" onClick={() => handleSave(index)}>
                        Save
                      </button>
                    ) : (
                      <button className="px-3 py-1 mr-2 bg-blue-500 text-white text-xs font-semibold rounded-md hover:bg-blue-600" onClick={() => handleEdit(index)}>
                        Edit
                      </button>
                    )}
                    <button className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-md hover:bg-red-600" onClick={() => handleDelete(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                No events found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
