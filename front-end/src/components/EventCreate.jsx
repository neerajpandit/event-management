import React, { useState } from "react";

const EventCreate = () => {
    const [showForm, setShowForm] = useState(false);
    const [eventData, setEventData] = useState({
        name: "",
        description: "",
        date: "",
        time: "",
        organizer: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEventData({ ...eventData, banner: reader.result }); // Convert file to Base64 URL
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Retrieve the access token from localStorage or wherever it's stored
        const token = localStorage.getItem("accessToken");
console.log(token);
        if (!token) {
            alert("Access token is missing. Please log in.");
            return;
        }

        const response = await fetch("http://localhost:8001/api/v1/events/createevent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Add the token to the Authorization header
            },
            body: JSON.stringify({
                name: eventData.name,
                description: eventData.description,
                organizer: eventData.organizer,
                date: eventData.date,
                time: eventData.time,
            }),
        });

        const result = await response.json();

        if (response.ok) {
            alert("Event created successfully!");
            setShowForm(false);
            setEventData({
                name: "",
                description: "",
                date: "",
                time: "",
                organizer: "",
            });
        } else {
            alert(`Error: ${result.message}`);
        }
    };

    return (
        <div className="flex mt-10 ml-2 ">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setShowForm(true)}
            >
                Create Event
            </button>

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-lg p-6 rounded-lg w-96">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h2 className="text-xl font-bold text-center">Create Event</h2>

                            <div>
                                <label className="block font-semibold">Event Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={eventData.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">Founder Name:</label>
                                <input
                                    type="text"
                                    name="organizer"
                                    value={eventData.organizer}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">Description:</label>
                                <textarea
                                    name="description"
                                    value={eventData.description}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-semibold">Date:</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={eventData.date}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-semibold">Time:</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={eventData.time}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div className="flex gap-2">
                                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
                                    Save Event
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-400 text-white px-4 py-2 rounded w-full"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventCreate;
