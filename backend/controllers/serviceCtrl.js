const Services = require("../models/serviceModel");

const serviceCtrl = {
  getServices: async (req, res) => {
    try {
      const services = await Services.find();

      res.json(services);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createService: async (req, res) => {
    try {
      const { service_id, title, image, category, content, price } = req.body;
      if (!image) return res.status(400).json({ msg: "No image upload" });

      const service = await Services.findOne({ service_id });
      if (service)
        return res.status(400).json({ msg: "This product already exists" });

      const newService = new Services({
        service_id,
        title: title.toLowerCase(),
        image,
        category,
        content,
        price,
      });

      await newService.save();
      res.json({ msg: "Created a service" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteService: async (req, res) => {
    try {
      await Services.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a service" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateService: async (req, res) => {
    try {
      const { title, image, category, content, price } = req.body;
      if (!image) return res.status(400).json({ msg: "No image upload" });

      await Services.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          image,
          category,
          content,
          price,
        }
      );

      res.json({ msg: "Updated a service" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = serviceCtrl;
