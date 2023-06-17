const express = require("express")
const router = express.Router()

const {signup , login , Me , protect} = require("../controllers/C_user")
const { V_signup  , V_login} = require("../validation/V_user")

router.post("/signup" , V_signup , signup)
router.post("/login"  , V_login , login)
router.get ("/Me"     , protect , Me)




module.exports = router