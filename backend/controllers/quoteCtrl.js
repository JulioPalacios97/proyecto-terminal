const Quotes = require("../models/quoteModel");

const quoteCtrl = {
  getQuotes: async (req, res) => {
    try {
      const quotes = await Quotes.find();
      res.json(quotes);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createQuote: async (req, res) => {
    try {
      const {
        user,
        type_project,
        service,
        start_date,
        end_date,
        quote_admin,
        days,
        hours,
        detailConcept,
        total,
        people_involves,
        organization_size,
        level_difficulty,
      } = req.body;

      const newQuote = new Quotes({
        user,
        type_project,
        service,
        start_date,
        end_date,
        quote_admin,
        days,
        hours,
        detailConcept,
        total,
        people_involves,
        organization_size,
        level_difficulty,
      });

      await newQuote.save();

      res.json({
        msg: "Create Quote",
        newQuote,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = quoteCtrl;
