const router = require("express").Router();
const newsCtrl = require("../controllers/newsCtrl");
const auth = require("../middleware/auth");

router.route("/news").get(newsCtrl.getNews).post(auth, newsCtrl.createNew);

router
  .route("/news/:id")
  .delete(auth, newsCtrl.deleteNew)
  .put(auth, newsCtrl.updateNew);

module.exports = router;
