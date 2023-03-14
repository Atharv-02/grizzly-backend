const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: [true, "Must Provide a hash"],
    trim: true,
    maxlength: [20, "name cannot be more than 20 characters"],
  },

  img_url: {
    type: String,
    required: [true, "Must Provide a Image URL"],
    trim: true,
  },
});

module.exports = mongoose.model("hashes", TaskSchema);
