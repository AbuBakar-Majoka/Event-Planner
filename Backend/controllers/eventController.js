import Event from "../models/Event.js";

// Get Events
export const getAllEvents = async (req, res) => {
  const { category, date, id } = req.query;
  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (id) {
    filter._id = id;
  }

  if (date) {
    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    filter.date = {
      $gte: startOfDay,
      $lte: endOfDay,
    };
  }

  try {
    const events = await Event.find(filter).sort({ date: 1 });

    if (events.length === 0) {
      return res.status(404).json({
        message: "No events found",
      });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({
      error: "Server error while fetching records",
    });
  }
};


// Create Events
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, category } = req.body;

    if (!title || !date || !category) {
      return res.status(400).json({
        error: "Missing required fields",
        missing: {
          title: !title ? "Title is required" : undefined,
          date: !date ? "Date is required" : undefined,
          category: !category ? "Category is required" : undefined,
        },
      });
    }

    const allowedCategories = ["work", "personal", "other"];
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        error: "Invalid category",
        allowedCategories,
      });
    }

    const event = new Event({ title, description, date, category });
    await event.save();

    res.status(200).json({
      id: event.id,
      message: "Event Created Successfully",
    });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({
      error: "Server error while creating event",
    });
  }
};

// Update Events
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      id: event.id,
      message: "Event Updated Successfully",
    });
  } catch (error) {
    res.status(400).json({ error: "Server error while updating event" });
  }
};

// Delete Events
export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error while deleting event" });
  }
};
