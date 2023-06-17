const express = require("express")
require("dotenv").config({ path: ".env" })
const cors = require("cors")
const app = express()
const Goals = require("./routes/Goals")
const user = require("./routes/user")
const moragn = require("morgan")
const {globalError} = require("./middleware/errorHandle")
const connectiondb = require("./config/db")
const colors = require("colors")
connectiondb()

app.use(cors())
app.options("*", cors())
app.enable("trust proxy")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(moragn("dev"))

app.use("/api/goals" , Goals)
app.use("/api/user" , user)



app.all("*", (req, res, next) => {
  next(new Error (`can't find this route : ${req.originalUrl}`))
})
app.use(globalError)

const port = process.env.PORT 
app.listen(port , ()=>console.log(`connect in port ${port}`))