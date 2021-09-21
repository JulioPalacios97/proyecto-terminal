const Section = require("../models/sectionModel");

const sectionCtrl = {
  getSections: async (req, res) => {
    try {
      const sections = await Section.find();
      res.json(sections);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createSections: async (req, res) => {
    try {
      //if user have role = 1 --> admin
      //only admin can create, delete and update section
      const { name } = req.body;
      const section = await Section.findOne({ name });
      if (section)
        return res.status(400).json({ msg: "This section already exists." });

      const newSection = new Section({ name });

      await newSection.save();
      res.json({ msg: "Created a section" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteSection: async (req, res) => {
    try {
      await Section.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Section" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateSection: async (req, res) => {
    try {
      const { name } = req.body;
      await Section.findOneAndUpdate({ _id: req.params.id }, { name });

      res.json({ msg: "Updated a section" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = sectionCtrl;
