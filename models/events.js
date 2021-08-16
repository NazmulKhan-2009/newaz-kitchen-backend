// const {Schema, model}=require('mongoose')
const {Schema, model}=require('mongoose')
const mongoose=require('mongoose')

const eventSchema=new Schema({

 eventType:String,

 eventTime:String,

 email:String,

 phone:String,

 message:String,

 status:String,

 created_at:{
  type:Date,
  default:Date.now
  // default:new Date(Date.now()).toLocaleString()
 },
 



})

const eventsData=model('event', eventSchema)

module.exports = eventsData;



