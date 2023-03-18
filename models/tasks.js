const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Provide a name"],
    trim: true,
    maxlength: [20, "name cannot be more than 20 characters"],
  },
  desc: {
    type: String,
    required: [true, "Must Provide a hash"],
    trim: true,
  },
  imgLink: {
    type: String,
    required: [true, "Must Provide a Image URL"],
    trim: true,
  },
  wallet: {
    type: String,
    required: [true, "Must Provide a hash"],
    trim: true,
    maxlength: [40, "name cannot be more than 40 characters"],
  },
});

module.exports = mongoose.model("hashes", TaskSchema);
