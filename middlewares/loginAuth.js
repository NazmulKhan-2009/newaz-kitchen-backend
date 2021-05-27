const jwt=require('jsonwebtoken')


const loginAuth=(req,res,next)=>{
 try{
  const token=req.headers.authorization.split(' ')[1]
  const decode=jwt.verify(token,"mynameiskhan")
  req.user_name=decode.user_name
  req.user_id=decode.user_id

  next()

  }catch{
    req.error='Login time error'
    next()
  } ;
}


module.exports=loginAuth