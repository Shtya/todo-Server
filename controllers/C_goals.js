const AsyncHandler = require("express-async-handler")
const M_goal = require("../model/M_goals")
const M_user = require("../model/M_user")

exports.Get_ = AsyncHandler(async(req, res) => {
  let Query = M_goal.find({user : req.user._id})
  if(req.query.complete){
    Query = Query.find({user : req.user._id , complete : req.query.complete})
  }
  const data = await Query
  res.status(200).json({data})
})

exports.Post_ = AsyncHandler(async(req, res) => {
  const data = await M_goal.create({text:req.body.text , user:req.user.id})

  res.status(200).json({data })
})





exports.Put_ = AsyncHandler(async (req, res , next) => {
  const user = await M_user.findById(req.user.id)
  const data = await M_goal.findByIdAndUpdate(req.params.id, req.body, { new: true })

  if (!user) return next( new Error("this user no found ... "))
  if(user.id !== data.user.toString()) return next(new Error("user not Authroized ... "))
  res.status(200).json({data})
})

exports.Delete_ = AsyncHandler(async (req, res) => {
  const data = await M_goal.findByIdAndDelete(req.params.id)
  res.status(200).json({data})
})


exports.MoveToDone_ = AsyncHandler(async (req, res) => {
  const {id} = req.params
  const data = await M_goal.findById(id)
  
  if(data.complete === false){
    data.complete = true
    await data.save()
  }else{
    data.complete = false
    await data.save()
    }


    res.status(200).json(data)
})

// exports. like = ASync(async(req , res)=>{
//   const {user} = req.body
//   const post = await m_post.findById(req.params.id)

//   post.comments.map(e => e.populate("user"))
//   if(!post) return res.status(404).json("This Id No Exist")

//   !post.likes.includes(user) 
//   ?  post.likes.push(user)
//   :  post.likes.pop(user)



//   await post.save()
  
//   res.status(201).json(post)
// })