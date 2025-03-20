import fs from "fs";
import path from "path";
// import { v4 as uuidv4 } from "uuid";
// Define the path for the calendar JSON file
const dataFilePath = path.resolve("data", "calendar.json");

// Ensure the file exists and is initialized
const ensureFileExists = () => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify({}));
  }
};

// Load data from the JSON file
const loadData = () => {
  ensureFileExists();
  return JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
};

// Save data to the JSON file
const saveData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Schedule a reminder (server-side)
const scheduleReminder = (event) => {
  const now = new Date().getTime();
  const reminderTime = new Date(event.reminderTime).getTime();

  if (reminderTime > now) {
    const delay = reminderTime - now;
    setTimeout(() => {
      console.log(`Reminder: ${event.title}`); // This can be replaced with a notification system
    }, delay);
  }
};

// Add an event (POST)
const addEvent = (req, res) => {
  try {
    const { date, type, title, color, reminderTime } = req.body;

    const data = loadData();

    // Ensure the date has an array initialized
    if (!data[date]) {
      data[date] = [];
    }

    // Add the new event
    const newEvent = { title, type, color, reminderTime };
    data[date].push(newEvent);
    saveData(data);

    // Schedule the reminder
    scheduleReminder(newEvent);

    res.status(201).json({ message: "Event added successfully", data });
  } catch (error) {
    console.error("Error adding event:", error.message);
    res.status(500).json({ error: "Failed to add event." });
  }
};

// Update an existing event (PATCH)
const updateEvent = (req, res) => {
  try {
    const { date, title, type, color, reminderTime } = req.body; // Fields to update
    const { id } = req.params; // Extract ID from URL

    if (!date || !id) {
      return res.status(400).json({ error: "Date and ID are required to update an event." });
    }

    const data = loadData();

    // Check if the date exists
    if (!data[date]) {
      return res.status(404).json({ error: "No events found for the provided date." });
    }

    // Find the event by ID
    const eventIndex = data[date].findIndex((event) => event.id === id);

    if (eventIndex === -1) {
      return res.status(404).json({ error: "Event not found." });
    }

    // Update only the provided fields
    const eventToUpdate = data[date][eventIndex];
    eventToUpdate.title = title ?? eventToUpdate.title;
    eventToUpdate.type = type ?? eventToUpdate.type;
    eventToUpdate.color = color ?? eventToUpdate.color;
    eventToUpdate.reminderTime = reminderTime ?? eventToUpdate.reminderTime;

    // Save the updated data
    saveData(data);

    // Reschedule the reminder if needed
    if (reminderTime) {
      scheduleReminder(eventToUpdate);
    }

    res.status(200).json({ message: "Event updated successfully", data });
  } catch (error) {
    console.error("Error updating event:", error.message);
    res.status(500).json({ error: "Failed to update event." });
  }
};


// Get events (GET)
const getEvents = (req, res) => {
  try {
    const { date } = req.query; // Retrieve date from query params
    const data = loadData();

    if (date) {
      res.status(200).json(data[date] || []);
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error retrieving events:", error.message);
    res.status(500).json({ error: "Failed to retrieve events." });
  }
};

// Delete an existing event (DELETE)
const deleteEvent = (req, res) => {
  try {
    const { date } = req.body; // Date of the event
    const { id } = req.params; // ID of the event to delete

    if (!date || !id) {
      return res.status(400).json({ error: "Date and ID are required to delete an event." });
    }

    const data = loadData();

    // Check if the date exists
    if (!data[date]) {
      return res.status(404).json({ error: "No events found for the provided date." });
    }

    // Filter out the event with the provided ID
    const updatedEvents = data[date].filter((event) => event.id !== id);

    if (updatedEvents.length === data[date].length) {
      return res.status(404).json({ error: "Event not found." });
    }

    data[date] = updatedEvents;

    // If no events are left for the date, remove the date key
    if (data[date].length === 0) {
      delete data[date];
    }

    saveData(data);
    res.status(200).json({ message: "Event deleted successfully", data });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    res.status(500).json({ error: "Failed to delete event." });
  }
};

export { getEvents, updateEvent, addEvent, deleteEvent };
