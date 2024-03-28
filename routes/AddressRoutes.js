const routes = require('express').Router()
const addresscontroller = require('../controllers/AddressController')

routes.post("/address",addresscontroller.createaddress)

module.exports = routes  
