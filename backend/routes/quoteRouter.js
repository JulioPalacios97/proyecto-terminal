const router = require("express").Router();
const quoteCtrl = require("../controllers/quoteCtrl");

router.route("/quote").get(quoteCtrl.getQuotes).post(quoteCtrl.createQuote);

module.exports = router;
