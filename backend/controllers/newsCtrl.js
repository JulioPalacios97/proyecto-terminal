const News = require("../models/newsModel");

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

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const newsCtrl = {
  getNews: async (req, res) => {
    try {
      const features = new APIfeatures(News.find(), req.query)
        .filtering()
        .sorting()
        .paginating();

      const news = await features.query;

      res.json({
        status: "success",
        result: news.length,
        news: news,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createNew: async (req, res) => {
    try {
      const { title, image, content, category, date } = req.body;
      if (!image)
        return res.status(400).json({ msg: "No a cargado una imagen" });

      const news = await News.findOne({ title });
      if (news) return res.status(400).json({ msg: "Esta noticia ya existe" });

      const newNews = new News({
        title: title.toLowerCase(),
        image,
        content,
        category,
        date,
      });

      await newNews.save();
      res.json({ msg: "Noticia creada" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteNew: async (req, res) => {
    try {
      await News.findByIdAndDelete(req.params.id);
      res.json({ msg: "Noticia eliminada" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateNew: async (req, res) => {
    try {
      const { title, image, content, category, date } = req.body;
      if (!image)
        return res.status(400).json({ msg: "No a cargado una imagen" });

      await News.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          image,
          content,
          category,
          date,
        }
      );
      res.json({ msg: "Noticia actualizada" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = newsCtrl;
