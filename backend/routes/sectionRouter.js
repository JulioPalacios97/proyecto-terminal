const router = require("express").Router();
const sectionCtrl = require("../controllers/sectionCtrl");
const auth = require("../middleware/auth");

router
  .route("/section")
  .get(sectionCtrl.getSections)
  .post(auth, sectionCtrl.createSections);

router
  .route("/section/:id")
  .delete(auth, sectionCtrl.deleteSection)
  .put(auth, sectionCtrl.updateSection);

module.exports = router;
