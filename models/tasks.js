const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: [true, "Must Provide a Name"],
    trim: true,
    maxlength: [20, "name cannot be more than 20 characters"],
  },
});

module.exports = mongoose.model("hashes", TaskSchema);
