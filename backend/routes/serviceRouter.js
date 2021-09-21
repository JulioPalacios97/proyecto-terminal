const router = require("express").Router();
const serviceCtrl = require("../controllers/serviceCtrl");
const auth = require("../middleware/auth");
//const authAdmin = require("../middleware/authAdmin");

router
  .route("/services")
  .get(serviceCtrl.getServices)
  .post(auth, serviceCtrl.createService);

router
  .route("/services/:id")
  .delete(auth, serviceCtrl.deleteService)
  .put(auth, serviceCtrl.updateService);

module.exports = router;
