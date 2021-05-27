const UserRegister=require('../models/user')
const admin=require('../models/admin')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');


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
const existEmail=await UserRegister.findOne({user_email:userData.user_email})
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
}else if(existEmail){
  res.status(200).json({
    response:`Already registered with ${existEmail.user_email} try another one`
  })
}else if(existPhone){
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
}
 
  }catch(e){
    res.status(400).send(e)
  } ;
}

//SIGN IN
const signIn=async(req,res)=>{
  const {user_name,user_email}=req.body
  
  try{
    const fetchUserName=await UserRegister.findOne({user_name}).populate('order','orderId order_status  ordered_Data -_id')
    const fetchUserEmail=await UserRegister.findOne({user_email})

    //! ADMIN VALIDATION
    const fetchAdminName=await admin.findOne({admin_name:user_name})
    const fetchAdminEmail=await admin.findOne({admin_email:user_email})
    // !WORKING START FROM HERE
    // const fetchAdminName=await admin.findOne({admin_name:user_name})
    // console.log(fetchAdminName.admin_email)
    
    console.log(fetchUserName)
    if(fetchUserName && fetchUserEmail ){
     const matchPassword=await bcrypt.compare(req.body.user_password, fetchUserName.user_password);
     console.log(matchPassword)
     if(matchPassword){
      const token=await jwt.sign({
        // data:{user_name:fetchUserName.user_name,user_id:fetchUserName._id}
        user_name:fetchUserName.user_name,user_id:fetchUserName._id
      }, 'mynameiskhan', { expiresIn: '1h' });

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
     
    }else if(fetchAdminName && fetchAdminEmail){
      console.log("that is an Admin")
      const matchPassword=await bcrypt.compare(req.body.user_password,fetchAdminName.admin_password)
      
      if(matchPassword){

        const token=await jwt.sign({admin_name:fetchAdminName.admin_name,admin_id:fetchAdminName._id},'mynameiskhan',{expiresIn:'1h'})
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

module.exports={
 createUser,
 signIn,
 userList

}