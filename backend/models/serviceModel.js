const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    service_id: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Services", serviceSchema);
