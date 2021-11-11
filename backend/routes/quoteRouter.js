const router = require("express").Router();
const quoteCtrl = require("../controllers/quoteCtrl");
const auth = require("../middleware/auth");

router
  .route("/quote")
  .get(quoteCtrl.getQuotes)
  .post(auth, quoteCtrl.createQuote);

router.route("/quote/:id").delete(auth, quoteCtrl.deleteQuote);

module.exports = router;
