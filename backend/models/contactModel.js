const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    service: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: "nuevo",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contacts", contactSchema);
