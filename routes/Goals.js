const express = require("express")
const router = express.Router()
const {Get_ , Put_ , Delete_ , Post_ , MoveToDone_} = require("../controllers/C_goals")
const { protect } = require("../controllers/C_user")

router.get("/" , protect ,  Get_ )
router.post("/" , protect ,  Post_ )
router.put("/:id" ,  protect , Put_ )
router.delete("/:id" , protect ,  Delete_ )
router.put("/MoveToDone/:id"  ,  MoveToDone_ )





module.exports = router