const UserRegister=require('../models/user')
const bcrypt=require('bcrypt')


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

console.log(existUser)

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
  const user_name=req.body.user_name
  try{
    const fetchUserName=await UserRegister.findOne({user_name})
    
    console.log(fetchUserName)
    if(fetchUserName){
     const matchPassword=await bcrypt.compare(req.body.user_password, fetchUserName.user_password);
     console.log(matchPassword)
     if(matchPassword){
        res.status(200).json({
          data:fetchUserName,
          status:['success',"Successfully Logged In"]
          
        })
        }else{
          res.status(201).json({
            status:['error',"Authentication Failed: pass"]
          
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


module.exports={
 createUser,
 signIn

}