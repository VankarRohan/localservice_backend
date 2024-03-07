const router = require('express').Router();
const userController = require("../controllers/UserController");

router.post("/user",userController.createuser)
router.get("/user",userController.getuser)
router.delete("/user/:id",userController.deleteuser)
router.put("/user/:id",userController.updateuser)
router.post("/user/login",userController.loginuser)

module.exports = router