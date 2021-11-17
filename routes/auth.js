const controller = require("../controllers/auth.controller")
const router = require('../routes/items')
const verifyToken = require('../auth.middleware')

router.post('/create_user',  verifyToken, controller.createUser)

router.post("/login", controller.login)

module.exports = router