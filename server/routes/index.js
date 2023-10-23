const router = require('express').Router();
const Controller = require('../controller/index')

//--------------------------- USERS ---------------------------
router.post('/register', Controller.register)
    .post('/login', Controller.login)

module.exports = router