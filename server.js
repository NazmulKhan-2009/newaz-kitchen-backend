//todo compass gui

// const mongoose = require('mongoose');

// // Creating Database
// mongoose.connect("mongodb://localhost:27017/newazkitchenadmin",{
//  useCreateIndex: true,
//  useNewUrlParser:true,
//  useUnifiedTopology: true,
//  useFindAndModify:false
// }).then(()=>{
//  console.log("Connection Successfull in Compass DataBase okay")
// })
// .catch((e)=>{
// console.log("No connection")
// })


//todo get hide 



//! NEWAZ KITCHEN BACKEND
//todo to ATLAS MONGODB

// require('dotenv').config()
const mongoose = require('mongoose');

// const DB= `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qnbwm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

//const DB=`mongodb://localhost:27017/newazkitchenadmin`

const DB=`mongodb+srv://nkadmin:nazifa1309@cluster0.qnbwm.mongodb.net/newazkitchen?retryWrites=true&w=majority`

//Creating Database
mongoose.connect(DB,{
 useCreateIndex: true,
 useNewUrlParser:true,
 useUnifiedTopology: true,
 useFindAndModify:false
}).then(()=>{
 console.log("Connection Successfull in DataBase okay USING REMOTE DB SERVER")
})
.catch((e)=>{
console.log("No connection")
})
