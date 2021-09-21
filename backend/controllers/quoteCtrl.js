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
      const { service, admin, detailConcept, total } = req.body;

      const newQuote = new Quotes({
        service,
        admin,
        detailConcept,
        total,
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
