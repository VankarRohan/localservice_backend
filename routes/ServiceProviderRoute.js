const router = require('express').Router();
const serviceprovidercontroller = require('../controllers/ServiceProviderController');

router.post("/sprovider",serviceprovidercontroller.createSprovider)
router.get("/sprovider",serviceprovidercontroller.getSprovider)
router.delete("/sprovider/:id",serviceprovidercontroller.deleteSprovider)
router.put("/sprovider/:id",serviceprovidercontroller.updateSprovider)
// router.get("/sprovider/:id",serviceprovidercontroller.getSproviderByServiceId)
router.post("/sprovider/login",serviceprovidercontroller.loginserviceprovider)



module.exports = router