import { Event } from '../models/event.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';



export const createEvent = asyncHandler(async (req, res) => {
    const { eventName, description, date } = req.body;
    console.log(req.userID );
    
    const createdBy = req.userID || "1"; // Assuming `req.userID` is set via authentication middleware

    let eventImage = ""; 

    if (req.files?.eventImage) {
        const eventImageLocalPath = req.files.eventImage[0].path;

        if (!eventImageLocalPath) {
            throw new ApiError(400, "Event image file is required");
        }

        const uploadedImage = await uploadOnCloudinary(eventImageLocalPath);
        
        if (!uploadedImage) {
            throw new ApiError(400, "Failed to upload event image");
        }

        eventImage = uploadedImage.url;
    }

    const event = new Event({
        eventName,
        description,
        date,
        eventImage,
        createdBy,
    });

    await event.save();
    res.status(201).json(new ApiResponse(201, event, 'Event created successfully'));
});


export const getAllEvents = asyncHandler(async (req, res) => {
    const events = await Event.find().populate("createdBy", "name email").populate("attendees", "name email");

    if (!events.length) {
        throw new ApiError(404, "No events found");
    }

    res.status(200).json(new ApiResponse(200, events, "Events retrieved successfully"));
});

export const getEventById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid event ID");
    }

    const event = await Event.findById(id).populate("createdBy", "name email").populate("attendees", "name email");

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    res.status(200).json(new ApiResponse(200, event, "Event retrieved successfully"));
});

export const getNextUpcomingEvent = asyncHandler(async (req, res) => {
    const currentDate = new Date();

    const nextEvent = await Event.findOne({ date: { $gte: currentDate } })
        .sort({ date: 1 })
        .populate("createdBy", "name email")
        .populate("attendees", "name email");

    if (!nextEvent) {
        throw new ApiError(404, "No upcoming events found");
    }

    res.status(200).json(new ApiResponse(200, nextEvent, "Next upcoming event retrieved successfully"));
});


export const updateEvent = asyncHandler(async (req, res) => {
  const { eventName, description, date, eventImage } = req.body;
  const event = await Event.findById(req.params.id);

  if (!event) {
    throw new ApiError(404, 'Event not found');
  }

  if (event.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You are not authorized to update this event');
  }

  event.eventName = eventName || event.eventName;
  event.description = description || event.description;
  event.date = date || event.date;
  event.eventImage = eventImage || event.eventImage;
  event.updatedAt = Date.now();

  await event.save();
  res.status(200).json(new ApiResponse(200, event, 'Event updated successfully'));
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    throw new ApiError(404, 'Event not found');
  }

  if (event.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You are not authorized to delete this event');
  }

  await event.deleteOne();
  res.status(200).json(new ApiResponse(200, null, 'Event deleted successfully'));
});

export const addAttendee = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    throw new ApiError(404, 'Event not found');
  }

  if (event.attendees.includes(req.user._id)) {
    throw new ApiError(400, 'User already added as an attendee');
  }

  await event.addAttendee(req.user._id);
  res.status(200).json(new ApiResponse(200, event, 'Attendee added successfully'));
});
