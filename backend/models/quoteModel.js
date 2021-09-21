const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    service: String,
    admin: String,
    detailConcept: {
      type: Array,
      default: [],
    },
    total: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quote", quoteSchema);
