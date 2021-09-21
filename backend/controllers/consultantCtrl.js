const Consultants = require("../models/consultantModel");

const consultantCtrl = {
  getConsultants: async (req, res) => {
    try {
      const consultants = await Consultants.find();

      res.json(consultants);
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
        return res.status(400).json({ msg: "This product already exists" });

      const newConsultant = new Consultants({
        consultant_id,
        name,
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
          name,
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
