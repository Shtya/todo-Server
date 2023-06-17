const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
  name:{type :String , required:true},
  email:{type :String , required:true , unique :true},
  password:{type :String , required:true},
  done:[{type:String , ref:"goal" }]
})


module.exports = mongoose.model("user"  , Schema)