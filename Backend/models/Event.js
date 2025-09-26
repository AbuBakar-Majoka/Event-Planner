import mongoose from "mongoose";

const allowedCategories = ["work", "personal", "other"];

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  category: {
    type: String,
    enum: allowedCategories,
    required: true,
  },
});

export default mongoose.model("Event", eventSchema);
