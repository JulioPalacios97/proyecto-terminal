const router = require("express").Router();
const consultantCtrl = require("../controllers/consultantCtrl");
const auth = require("../middleware/auth");
//const authAdmin = require("../middleware/authAdmin");

router
  .route("/consultants")
  .get(consultantCtrl.getConsultants)
  .post(auth, consultantCtrl.createConsultant);

router
  .route("/consultants/:id")
  .delete(auth, consultantCtrl.deleteConsultant)
  .put(auth, consultantCtrl.updateConsultant);

module.exports = router;
