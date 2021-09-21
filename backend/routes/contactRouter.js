const router = require("express").Router();
const contactCtrl = require("../controllers/contactCtrl");

router
  .route("/contact")
  .get(contactCtrl.getContacts)
  .post(contactCtrl.createContact);

module.exports = router;
