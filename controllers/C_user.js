const AsyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")
const M_user = require("../model/M_user")


exports.signup = AsyncHandler(async (req, res) => {
  const { email, name, password } = req.body
  const hashPass = await bcrypt.hash(password, 12)
  
  const data = await M_user.create({name , email , password : hashPass})
  const token = JWT.sign({id:data._id }, process.env.JWT_secret , {expiresIn:process.env.JWT_expire})
  res.status(200).json({data , token})
})


exports.login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body
  const data = await M_user.findOne({ email })
  const token = JWT.sign({id:data._id }, process.env.JWT_secret , {expiresIn:process.env.JWT_expire})
  res.status(201).json({data , token})
})



exports.Me = AsyncHandler(async (req, res) => {
  const data = await M_user.findById(req.user._id)
  res.status(201).json({data})
})


exports.protect = AsyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization ) token = req.headers.authorization.split(" ")[1]
  if(!token) return next( new Error("You are not Login , please Login to get access this route"))
  
  const decoded = JWT.verify(token, process.env.JWT_secret)
  const user = await M_user.findById(decoded.id)
  if (!user) return  next(new Error("The user that belong to this token does no longer exist"))
  req.user = user
  next()
})