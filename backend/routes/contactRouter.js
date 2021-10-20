const router = require("express").Router();
const contactCtrl = require("../controllers/contactCtrl");
const auth = require("../middleware/auth");

router
  .route("/contact")
  .get(contactCtrl.getContacts)
  .post(contactCtrl.createContact);

router
  .route("/contact/:id")
  .delete(auth, contactCtrl.deleteContact)
  .put(auth, contactCtrl.updateContact);

module.exports = router;
