const { check, validationResult } = require("express-validator")
const M_user = require("../model/M_user")
const bcrypt = require("bcryptjs")

const v_layer = (req, res, next) => {
  const err = validationResult(req)
  if (!err.isEmpty()) {
    return res.status(400).json({_err : err.array()})
  }
  next()
}


exports.V_signup = [
  check("name").notEmpty().withMessage("This name is Empty"),
  check("email").isEmail().withMessage("Email not valid")
    .custom(async(val, { req }) => {
      const data = await M_user.findOne({ email: val })
      if (data) return Promise.reject(new Error("This E-mail already existis ... "))
      
  })
  , v_layer
]


exports.V_login = [
  check("email").isEmail().withMessage("Invalid E-mail")
    .custom(async(val, { req }) => {
      const data = await M_user.findOne({ email: val })

      if (!data || !(await bcrypt.compare(req.body.password, data.password)) ) {
        return Promise.reject(new Error(" E-mail Or Password Invalid ... "))
      }

    })
  ,v_layer
]