import React, { useEffect, useState } from 'react';

const EventListCards = () => {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    // Fetch data from the actual API
    fetch('http://localhost:8001/api/v1/events/getalllist')
      .then((response) => response.json())
      .then((data) => {
        if (data?.data) {
          // Map the fetched data to match your event structure
          const mappedEvents = data.data.map((item) => ({ // Removed slice(0, 3) to get all events
            id: item._id,
            name: item.name,
            date: item.date, // Using the actual event date from the API
            image: "https://www.eventsindustryforum.co.uk/images/articles/about_the_eif.jpg",
            description: item.description,
          }));
          setEvents(mappedEvents);
        }
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);
  
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-black text-center mb-8">
          Introducing Our Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg p-8">
              <div className="relative overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src={event.image}
                  alt={event.name}
                />
                <div className="absolute inset-0 bg-black opacity-40"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-4">{event.name}</h3>
              <p className="text-gray-500 text-sm mt-2">{event.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-900 font-bold text-lg">{event.date}</span>
                <button className="bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventListCards;
