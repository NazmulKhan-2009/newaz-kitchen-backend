const Admin=require('../models/admin')
const user=require('../models/user')
const bcrypt=require('bcrypt')

//!create admin

const createAdmin=async(req,res)=>{
//  console.log(req.body.admin_email)
 

 try{
  const {admin_name, admin_email, admin_mobile,admin_password,admin_imageUrl}=req.body


 const time =new Date().toLocaleTimeString()
 const date=new Date().toDateString() 
 const created_date=`Date : ${date} & Time : ${time}`

 const reg_as_userEmail=await user.findOne({user_email:admin_email})
 const reg_as_userName=await user.findOne({user_name:admin_name})
 
 const adminEmail=await Admin.findOne({admin_email:admin_email})
 const adminName=await Admin.findOne({admin_name:admin_name})
 const adminMobile=await Admin.findOne({admin_mobile:admin_mobile})
//  console.log(adminEmail.admin_email)

 if(reg_as_userEmail){
  console.log(`${admin_email} already Registered as an user`) 
  res.status(200).json({
    response:`${admin_email} already Registered as an user`
  })
  
 }else if(reg_as_userName){
  console.log(`${admin_email} already Registered as an user`) 
  res.status(200).json({
    response:`${admin_name} already Registered as an user`
  })

 }else if(adminEmail || adminName || adminMobile){
    console.log("already Exit admin info in db")
    res.status(200).json({
      response:`already Exit admin info in db`
    })
 } else{
   const hash_pass=await bcrypt.hash(admin_password,10)
  const adminInfo=new Admin({
    admin_name,admin_email,admin_mobile,admin_password:hash_pass,admin_imageUrl,created_date
  })
 
  const resData=await adminInfo.save()
 //  console.log(resData)
 res.status(200).json({
  response: `Welcome ${resData.admin_name} , Admin created Succesfully`,
})
 }

 
     
  }catch(e){
    
    console.log(e)
  } ;



}


module.exports={
 createAdmin

}