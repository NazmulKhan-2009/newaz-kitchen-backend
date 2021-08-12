const {Schema, model}=require('mongoose')

const adminSchema=new Schema({
 admin_name:{
  type:String,
  required:true,
  trim:true,
  unique:true
 },
 admin_email:{
  type:String,
  required:true,
  trim:true,
  unique:true
 },
 admin_mobile:{
  type:String,
  required:true,
  trim:true,
  unique:true
 },
 admin_password:{
   type:String,
   required:true
},
userImage:{
  type:String
 },

 created_date:{
   type:String
 }
})

const admin=new model('Admin', adminSchema)

module.exports = admin ;

