const Consultants = require("../models/consultantModel");

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

const consultantCtrl = {
  getConsultants: async (req, res) => {
    try {
      const features = new APIfeatures(Consultants.find(), req.query)
        .filtering()
        .paginating();

      const consultants = await features.query;

      res.json({
        status: "success",
        result: consultants.length,
        consultants: consultants,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createConsultant: async (req, res) => {
    try {
      const { consultant_id, name, image, description } = req.body;
      if (!image) return res.status(400).json({ msg: "No image upload" });

      const consultant = await Consultants.findOne({ consultant_id });
      if (consultant)
        return res.status(400).json({ msg: "This consultant already exists" });

      const newConsultant = new Consultants({
        consultant_id,
        name: name.toLowerCase(),
        image,
        description,
      });

      await newConsultant.save();
      res.json({ msg: "Created a consultant" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteConsultant: async (req, res) => {
    try {
      await Consultants.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a consultant" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateConsultant: async (req, res) => {
    try {
      const { name, image, description } = req.body;
      if (!image) return res.status(400).json({ msg: "No image upload" });

      await Consultants.findOneAndUpdate(
        { _id: req.params.id },
        {
          name: name.toLowerCase(),
          image,
          description,
        }
      );

      res.json({ msg: "Updated a consultant" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = consultantCtrl;
