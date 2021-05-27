const mongoose=require('mongoose');

const OrderSchema=new mongoose.Schema({
 
 email:{
  type:String,
  trim:true,
  required:true
 },
 order_Time:{
  type:String,
  required:true
 },
 payment_by:{
  
 },
 purchasedInfo:{
  
 },
 delivery_Info:{
  
 },
 order_status:{
  type:String,
  required:true
 },
 ordered_Data:{
  
 },
 orderId:{
  type:String,
  required:true
 },
 user:{
  type:mongoose.Types.ObjectId,
  ref:"user"
 }
 
 
})

const OrderList=mongoose.model('OrderCollection',OrderSchema);



module.exports=OrderList