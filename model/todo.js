const { Timestamp } = require("mongodb");
const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completionDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = model("Todo", todoSchema);
