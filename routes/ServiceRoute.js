const routes = require('express').Router()
const servicecontroller = require('../controllers/ServiceController')

routes.post("/services",servicecontroller.createservice)
routes.get("/services",servicecontroller.getservice)
routes.get("/services/provider/:id",servicecontroller.getSproviderByServiceId)
routes.get("/services/:id",servicecontroller.getserviceById)
routes.delete("/services/:id",servicecontroller.deleteservice)
routes.put("/services/:id",servicecontroller.updateservice)
routes.get("/filterservice",servicecontroller.filterProduct)
// routes.post("/filteraddress", servicecontroller.filterbyaddress)

module.exports = routes