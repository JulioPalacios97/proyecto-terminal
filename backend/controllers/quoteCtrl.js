const Quotes = require("../models/quoteModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  /*sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }*/

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const quoteCtrl = {
  getQuotes: async (req, res) => {
    try {
      const features = new APIfeatures(Quotes.find(), req.query)
        .filtering()
        .paginating();

      const quotes = await features.query;
      res.json({
        status: "success",
        result: quotes.length,
        quotes: quotes,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createQuote: async (req, res) => {
    try {
      const {
        place_date,
        client_name,
        quote_number,
        service,
        start_date,
        end_date,
        quote_admin,
        days,
        hours,
        detailConcept,
        subtotal,
        total,
      } = req.body;

      const newQuote = new Quotes({
        place_date,
        client_name,
        quote_number,
        service,
        start_date,
        end_date,
        quote_admin,
        days,
        hours,
        detailConcept,
        subtotal,
        total,
      });

      await newQuote.save();

      res.json({ msg: "Cotización creada" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteQuote: async (req, res) => {
    try {
      await Quotes.findByIdAndDelete(req.params.id);
      res.json({ msg: "Cotización eliminada" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = quoteCtrl;
