require('dotenv').config()
const UserRegister=require('../models/user')
const admin=require('../models/admin')
const Event=require('../models/events')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');
const mailgun = require("mailgun-js");
const { json } = require('body-parser');
const DOMAIN = 'sandbox29e352940d3f4436ab3570871da6bd7c.mailgun.org';
// const DOMAIN = 'mail.newazkitchenbdapi.com'; //!not working
// const OrderList=require("../models/orders")
const FoodDetail=require("../models/foods");
const { findOneAndUpdate } = require('../models/user');

// const createUser = async(req,res)=>{
  
//  try{
//   //  const hash_pass=req.body.user_password===req.body.confirm_password?
//     // await bcrypt.hash(req.body.user_password, 10):false

//     const hash_pass=await bcrypt.hash(req.body.user_password, 10)

//   const userData={
//     user_name:req.body.user_name,
//     user_email:req.body.user_email,
//     user_phone:req.body.user_phone,
//     user_password:hash_pass,
//     local_date:new Date().toDateString(),
//     local_time:new Date().toLocaleTimeString(),
//   }

//   // const userInfo=new UserRegister(userData)
//   // await userInfo.save()
  
//   // confirm password validation from db
//   // const responsedData=hash_pass?await userInfo.save():{error:"password combination mismatch"}
// const existUser=await UserRegister.findOne({user_name:userData.user_name})
// const existEmail=await UserRegister.findOne({user_email:userData.user_email})
// const existPhone=await UserRegister.findOne({user_phone:userData.user_phone})
// const adminEmail=await admin.findOne({admin_email:userData.user_email})
// const adminName=await admin.findOne({admin_name:userData.user_name})

// // console.log(existUser)
// // console.log(adminInfo)

// // if(existUser){
// //   res.status(400).json({
// //     res:"user name exist"
// //   })
// // }else{
// //   res.status(200).json("okay")
// // }
// if(existUser){
//   res.status(200).json({
    
//     response:`${existUser.user_name} already Exist`
//   })
// }else if(existEmail){
//   res.status(200).json({
//     response:`Already registered with ${existEmail.user_email} try another one`
//   })
// }else if(existPhone){
//   res.status(200).json({
//     response:`Already registered with ${existPhone.user_phone} try another one`
//   })
// }else if(adminEmail){
//   res.status(200).json({
//     response:`Already registered as an admin`
//   })
// }else if(adminName){
//   res.status(200).json({
//     response:`title Already registered as an admin`
//   })
// }else{
//   const data=await UserRegister.create(userData)
//   res.status(200).json({
//     response: `Welcome ${data.user_name} , you Signed Up Succesfully`,
//   })
// }
 
//   }catch(e){
//     res.status(400).send(e)
//   } ;
// }

//! SIGN UP WITH EMAIL VERIFICATION CODE STARTED

const createUser = async(req,res)=>{
  
  try{
   //  const hash_pass=req.body.user_password===req.body.confirm_password?
     // await bcrypt.hash(req.body.user_password, 10):false
 
     const hash_pass=await bcrypt.hash(req.body.user_password, 10)
 
   const userData={
     user_name:req.body.user_name,
     user_email:req.body.user_email,
     user_phone:req.body.user_phone,
     user_password:hash_pass,
     local_date:new Date().toDateString(),
     local_time:new Date().toLocaleTimeString(),
   }
 
   // const userInfo=new UserRegister(userData)
   // await userInfo.save()
   
   // confirm password validation from db
   // const responsedData=hash_pass?await userInfo.save():{error:"password combination mismatch"}
 const existUser=await UserRegister.findOne({user_name:userData.user_name})
//  const existEmail=await UserRegister.findOne({user_email:userData.user_email})
 const existPhone=await UserRegister.findOne({user_phone:userData.user_phone})
 const adminEmail=await admin.findOne({admin_email:userData.user_email})
 const adminName=await admin.findOne({admin_name:userData.user_name})
 
 // console.log(existUser)
 // console.log(adminInfo)
 
 // if(existUser){
 //   res.status(400).json({
 //     res:"user name exist"
 //   })
 // }else{
 //   res.status(200).json("okay")
 // }
 if(existUser){
   res.status(200).json({
     
     response:`${existUser.user_name} already Exist`
   })
 }
//  else if(existEmail){
//    res.status(200).json({
//      response:`Already registered with ${existEmail.user_email} try another one`
//    })
//  }
 else if(existPhone){
   res.status(200).json({
     response:`Already registered with ${existPhone.user_phone} try another one`
   })
 }else if(adminEmail){
   res.status(200).json({
     response:`Already registered as an admin`
   })
 }else if(adminName){
   res.status(200).json({
     response:`title Already registered as an admin`
   })
 }else{
   const data=await UserRegister.create(userData)
   res.status(200).json({
     response: `Welcome ${data.user_name} , you Signed Up Succesfully`,
   })
 
  //!------------>
// const mg = mailgun({apiKey: '946ff4b1dc204b52b7e7e5b7f664d8ac-1f1bd6a9-df73d674', domain: DOMAIN});
// // const token=jwt.sign({userName:userData.user_name,userEmail:userData.user_email},process.env.JWT_REF,{expiresIn:'60m'})
// const token=jwt.sign(userData,'${process.env.JWT_REF}',{expiresIn:'60m'})

// const data = {
// 	from: 'noreply@hello.com',
// 	to: userData.user_email,
// 	subject: 'Ac Activation',
//   html:`
//   <h2>Activate Your Account</h2>
//   <a style="cursor:pointer; color:'tomato" href='http://localhost:5000/api/user/activeacc/${token}'>Activate Your Account</a>
//   `
// };
// mg.messages().send(data, function (error, body) {
// 	error ? res.status(200).json({response:'Something wrong'}) 
//   : res.status(200).json({
//        response: `Welcome ${userData.user_email} , you Signed Up Succesfully`,
//      })
// 	console.log({body});
// });
 }
  
   }catch(e){
     res.status(400).send(e)
   } ;
 }
 

const verifiedUser=async(req,res)=>{
    // console.log(req.params.signupinfo)
    // res.status(200).json({user_info:req.params.signupinfo})
    const verifiedData=jwt.verify(req.params.signupinfo, process.env.JWT_REF)
    console.log(verifiedData)
    // res.status(200).json(verifiedData)
   await UserRegister.create(verifiedData)

    res.redirect(`http://localhost:3000/verified/${req.params.signupinfo}`)
    
}


//! SIGN UP WITH EMAIL VERIFICATION CODE FINISHED

//SIGN IN
const signIn=async(req,res)=>{
  const {user_name,user_email}=req.body
  
  try{
    let accessByUser=false
    let aceessByAdmin=false
    const fetchUserName=await UserRegister.findOne({user_name}).populate('order','orderId order_status  ordered_Data -_id').populate('favorite',"imageUrl foodTitle -_id")
    // const fetchUserEmail=await UserRegister.findOne({user_email})
   
    

    //! ADMIN VALIDATION
    const fetchAdminName=await admin.findOne({admin_name:user_name})
    // const fetchAdminEmail=await admin.findOne({admin_email:user_email})
    // !WORKING START FROM HERE
    // const fetchAdminName=await admin.findOne({admin_name:user_name})
    // console.log(fetchAdminName.admin_email)

    if(fetchUserName) accessByUser=fetchUserName.user_email===user_email
    if(fetchAdminName) aceessByAdmin=fetchAdminName.admin_email===user_email

    
    console.log(fetchUserName)
    if(accessByUser){
     const matchPassword=await bcrypt.compare(req.body.user_password, fetchUserName.user_password);
     console.log(matchPassword)
     if(matchPassword){
      const token=await jwt.sign({
        // data:{user_name:fetchUserName.user_name,user_id:fetchUserName._id}
        user_name:fetchUserName.user_name,user_id:fetchUserName._id
      }, process.env.JWT_REF, { expiresIn: '1h' });

      console.log(token)

        res.status(200).json({
          data:fetchUserName,
          token,
          status:['success',"Successfully Logged In"]
          
        })
        }else{
          res.status(201).json({
            status:['error',"Authentication Failed: pass"]
          
          })
          // console.log("auth failed")
        }
     
    }else if(aceessByAdmin){
      console.log("that is an Admin")
      const matchPassword=await bcrypt.compare(req.body.user_password,fetchAdminName.admin_password)
      
      if(matchPassword){

        const token=await jwt.sign({admin_name:fetchAdminName.admin_name,admin_id:fetchAdminName._id},process.env.JWT_REF,{expiresIn:'1h'})
        console.log(token)

          res.status(200).json({
            data:fetchAdminName,
            token,
            status:["admin",`Welcome Admin ${fetchAdminName.admin_name}`]
          })
      }else{
        res.status(201).json({
          status:['error',"Authentication Failed as an Admin: pass"]
        
        })
        // console.log("auth failed")
      }
    }else{
      res.status(201).json({
        status:['error',"Authentication Failed: user"]
      
      })
      // console.log('auth fail from of username')
    }

   }catch{
     res.status(200).json({
       error:"Authoeee faileee"
     })
    } ;
}

const userList=async(req,res)=>{

  try{
    const userData=await UserRegister.find({user_name: "nazmul"}).populate('order','orderId order_status -_id')
    console.log(userData)
    res.status(200).json({
      data:userData
    })
      
   }catch{
     res.status(500).json({
       message:'Error from server'
     })
    } ;
    
}


const imageUpload=async(req,res)=>{
  const userData=await UserRegister.findOne({user_email:req.body.email})
  const adminData=await admin.findOne({admin_email:req.body.email})

  console.log({userData})
  // console.log({adminData})

  const {userImage,email}=req.body
// ! Without Try catch
  // if(userData){
  //   console.log('user Info ')
  //   await UserRegister.findOneAndUpdate({user_email:email},{userImage:userImage},{new:true},(err,docs)=>{
  //       if(!err){
  //         res.status(200).json(docs)
  //       }else{
  //         res.status(400).json('error')
          
  //       }
  //   })
  // } 
  // if(adminData){
  //   await admin.findOneAndUpdate({admin_email:email},{userImage:userImage},{new:true},(err,docs)=>{
  //     if(!err){
  //       res.status(200).json(docs)
  //     }else{
  //       res.status(400).json('error')
        
  //     }
  // })
  // }

  //! With Try Catch
let resData

  try{
      if(userData){
        resData=await UserRegister.findOneAndUpdate({user_email:email},{userImage:userImage},{new:true})
      }
      if(adminData){
        resData=await admin.findOneAndUpdate({admin_email:email},{userImage:userImage},{new:true})
      }

      res.status(200).json(resData)

   }catch(e){
     res.status(400).json('server error')
    } ;
}

const getProfile=async(req,res)=>{
  const userData=await UserRegister.findOne({user_email:req.params.email})
  const adminData=await admin.findOne({admin_email:req.params.email})

// console.log({adminData})
// if(adminData===null){
//   console.log('admin access')
// }else{console.log('admin accessed')}

// if(userData===null){
//   console.log('user access')
// }else{console.log('user does accessed')}

// try{
  
//   const resData=await UserRegister.findOne({user_email:req.params.email})
//   res.status(200).json(resData)
  
//     // res.status(200).json(resData)
    
//  }catch(e){
//    res.status(400).json('Server issue')
//   } ;

try{

let resData

if(userData){
  resData=await UserRegister.findOne({user_email:req.params.email}).populate('favorite',"imageUrl foodTitle _id").populate('order','orderId order_status  ordered_Data -_id').populate({path:'event' , options:{ sort: { "created_at": -1 } }})
}else if(adminData){
  resData=await admin.findOne({admin_email:req.params.email})
}
res.status(200).json(resData)

 }catch(e){
  res.status(400).json('Server issue')
  } ;





//  if(adminData){ await admin.findOne({admin_email:req.params.email},(err,docs)=>{
//   if(!err){
//   res.status(200).json(docs)
//   }else{
//     res.status(400).json(docs)
//   }
//     })}


}


//!add FAVORITE FOOD TO USER SCHEMA

const addFavFood=async(req,res)=>{
console.log(req.params)
const {foodId,email}=req.params

// db.student.find({}).project({roll:1, _id: 0})
// project({foodTitle:1,foodType:1})
// select('foodTitle foodType').

try{
    // const food=await FoodDetail.findById({_id:foodId}).select('_id')
    const fav=await UserRegister.findOne({user_email:email}).select('favorite -_id') 
    
    const isfavoriteExists=fav.favorite.some(item=>item==foodId)

    console.log('==============Favorite exists log======================');
    console.log(foodId);
    console.log(fav.favorite)
    console.log(isfavoriteExists)
    console.log('=======================================================');
    // const isfavoriteExists=fav.favorite.some(item=>item===foodId)
    // console.log(isfavoriteExists)

    if(!isfavoriteExists){

    
      const inv=await UserRegister.updateOne({user_email:email},{
        $push:{
          favorite:foodId
        }
      })
    }else{
      console.log('favorite already axists')
    }

    
    // console.log(food)
 }catch(e){
   console.log(e)
  } ;

  // const inv=await user.updateOne({_id:req.params.id},{
  //   $push:{
  //      order:orderDetails._id
  //   }
  // })

}


const addEvent=async(req,res)=>{
  console.log(req.body)
  try{
      const event=new Event({...req.body,status:'received'})
      const resData=await event.save()
      if(resData){
        const upData=await UserRegister.findOneAndUpdate({user_email:resData.email},{
          $push:{
            event:resData._id
          }
        })
        upData?console.log('success'):console.log('failed')
      }
      // resData?console.log('success'):console.log('failed')

   }catch(e){
     console.log(e)
    } ;

}



const cancelEvent=async(req,res)=>{
    console.log(req.params)

    const response=await Event.findByIdAndUpdate({_id:req.params.eventId},{status:'cancel'},{new:true})
    res.status(200).json(response)
    console.log(response)
}



//! RESET PASSWORD

const resetPassword=async(req,res)=>{
  const user_email=req.body.user_email
  const hash_pass=await bcrypt.hash(req.body.user_password, 10)
  
  const response=await UserRegister.findOneAndUpdate({user_email},{user_password:hash_pass})
  console.log(response)

// console.log(user_email,hash_pass)
}

module.exports={
 createUser,
 signIn,
 userList,
 verifiedUser,
 imageUpload,
 getProfile,
 addFavFood,
 addEvent,
 cancelEvent,
 resetPassword

}