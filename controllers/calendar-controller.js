import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const dataFilePath = path.resolve("data", "calendar.json");

// Ensure the JSON file exists
const ensureFileExists = () => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify({ events: [] }));
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

// Schedule a reminder (for Push Notifications)
const scheduleReminder = (event) => {
  const now = Date.now();
  const reminderTime = new Date(event.reminderTime).getTime();

  if (reminderTime > now) {
    const delay = reminderTime - now;
    setTimeout(() => {
      console.log(`Push Notification: Reminder for "${event.title}" at ${event.start}`);
      // Here, you could also send a notification via WebSocket or other APIs
    }, delay);
  }
};

// API Endpoints
const getEvents = (req, res) => {
  try {
    const data = loadData();
    res.status(200).json(data.events); // Return all events
  } catch (error) {
    console.error("Error retrieving events:", error.message);
    res.status(500).json({ error: "Failed to retrieve events." });
  }
};

const addEvent = (req, res) => {
  try {
    const { start, end, title, type, color, reminderTime, isCompleted, notes } = req.body;

    const data = loadData();

    // Create a new event object
    const newEvent = {
      id: uuidv4(),
      start,
      end,
      title,
      type,
      color,
      reminderTime,
      isCompleted: type === "To-Do" ? isCompleted ?? false : undefined, // Only relevant for To-Do
      notes: type === "Memory" ? notes || "" : undefined, // Only for Memory events
    };

    data.events.push(newEvent);
    saveData(data);

    // Schedule reminder
    scheduleReminder(newEvent);

    res.status(201).json({ message: "Event added successfully", event: newEvent });
  } catch (error) {
    console.error("Error adding event:", error.message);
    res.status(500).json({ error: "Failed to add event." });
  }
};


const updateEvent = (req, res) => {
  try {
    const { id } = req.params;
    const { start, end, title, type, color, reminderTime, isCompleted, notes } = req.body;

    const data = loadData();

    const eventIndex = data.events.findIndex((event) => event.id === id);

    if (eventIndex === -1) {
      return res.status(404).json({ error: "Event not found." });
    }

    // Update event details
    data.events[eventIndex] = {
      ...data.events[eventIndex],
      start: start ?? data.events[eventIndex].start,
      end: end ?? data.events[eventIndex].end,
      title: title ?? data.events[eventIndex].title,
      type: type ?? data.events[eventIndex].type,
      color: color ?? data.events[eventIndex].color,
      reminderTime: reminderTime ?? data.events[eventIndex].reminderTime,
      isCompleted: type === "To-Do" ? isCompleted ?? data.events[eventIndex].isCompleted : undefined,
      notes: type === "Memory" ? notes ?? data.events[eventIndex].notes : undefined,
    };

    saveData(data);
    res.status(200).json({ message: "Event updated successfully", event: data.events[eventIndex] });
  } catch (error) {
    console.error("Error updating event:", error.message);
    res.status(500).json({ error: "Failed to update event." });
  }
};


const deleteEvent = (req, res) => {
  try {
    const { id } = req.params;

    const data = loadData();

    const updatedEvents = data.events.filter((event) => event.id !== id);

    if (updatedEvents.length === data.events.length) {
      return res.status(404).json({ error: "Event not found." });
    }

    data.events = updatedEvents;

    saveData(data);

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    res.status(500).json({ error: "Failed to delete event." });
  }
};

export { getEvents, addEvent, updateEvent, deleteEvent };
