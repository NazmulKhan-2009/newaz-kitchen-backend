// const {Schema, model}=require('mongoose')
const {Schema, model}=require('mongoose')
const mongoose=require('mongoose')

const userRegisterSchema=new Schema({

 user_name:{
  type:String,
  required:true,
  
  unique:true
  
 },

 user_email:{
  type:String,
  required:true,
  
  unique:true
 },

 user_phone:{
  type:String,
  required:true,
  trim:true,
  unique:true
  
 },
 userImage:{
  type:String
 },

 user_password:{
  type:String,
  required:true
},

 local_date:{
  type:String
},

local_time:{
 type:String
},

int_time:{
 type:Date,
 default:new Date(Date.now()).toLocaleString()
},
order:[
  {
    type:mongoose.Types.ObjectId,
    ref:'OrderCollection'
  }
],
favorite:[
  {
    type:mongoose.Types.ObjectId,
    ref:'FoodCollection'
  }
],
event:[
  {
    type:mongoose.Types.ObjectId,
    ref:'event'
  }
],
})

const userRegisterData=model('user', userRegisterSchema)

module.exports = userRegisterData;



