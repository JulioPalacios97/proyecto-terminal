const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    place_date: String,
    client_name: String,
    quote_number: String,
    service: String,
    start_date: String,
    end_date: String,
    quote_admin: String,
    days: String,
    hours: String,
    detailConcept: {
      type: Array,
      default: [],
    },
    subtotal: Number,
    total: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quote", quoteSchema);
