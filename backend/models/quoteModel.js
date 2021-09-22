const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    user: String,
    type_project: String,
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
    total: Number,
    people_involves: {
      type: Array,
      default: [],
    },
    organization_size: String,
    level_difficulty: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quote", quoteSchema);
