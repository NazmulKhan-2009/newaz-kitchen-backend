const FoodDetail=require("../models/foods");

//ADD FOOD

const addFood=async(req , res)=>{
  // console.log(req.body)
 try{
     const time =new Date().toLocaleTimeString()
     const date=new Date().toDateString()        
     const foodData={
     foodTitle:req.body.foodTitle,
     foodType:req.body.foodType,
     description:req.body.description,
     price:req.body.price,
     imageUrl:req.body.imageUrl,
     Local_Date:date,
     Local_Time:time,
  }

     const foodDetailRes=await FoodDetail.create(foodData)
     //!console.log(foodDetailRes)
     res.status(201).json({
             status: 'success',
             data:foodDetailRes         
           });

 }catch(e){
     res.status(400).send(e)
   } ;
}

const getFoodsList=async(req,res)=>{
 try{
  const response=await FoodDetail.find()
  res.status(200).send(response)
  }catch(e){
    console.log(`Error from Server ${e}`)
  } ;
  
}

//Delete food
const deleteFood=async(req,res)=>{
  console.log(req.params.id)
  try {
    const isDel=await FoodDetail.findOneAndDelete({_id:req.params.id})
    // console.log(isDel)
    res.status(200).send(isDel===null?{success:"Not Found anything"}: {success:"Delete Successfully"})
  } catch (error) {
    console.log(`Error from Server ${error}`)
  }
}

const partialUpdate=async(req,res)=>{
const _id=req.params.id
const updateData=req.body

console.log(_id, updateData)

try {
  const updateInfo=await FoodDetail.findByIdAndUpdate(_id, updateData,{new:true})
  if(updateInfo!==null){
    res.status(200).send({success:"Update Successfully"})
  }

} catch (error) {
  res.status(400).send(error)
}

}

//SEARCH FOOD
const searchFood=async(req,res)=>{
  const _id=req.params.id 
  console.log(_id) 
  try {
    const foodInfo=await FoodDetail.find({_id:_id})
    if(foodInfo!==null){
      res.status(200).send({data:foodInfo})
    } 
  } catch (error) {
    res.status(400).send(error)
  }
  
  }


  //IMP SEARC FOOD BY KEY FROM USER

  const searchFoodBykey=async(req, res)=>{
    const key=req.body.keyWord
    console.log(key)
    // return this.find({courseName:new RegExp(clue,"i")})
    const data=await FoodDetail.find({foodTitle:new RegExp(key,"i")})
    // console.log(data)
    res.status(200).json({data})
  }

  const review=async(req,res)=>{
    try{
        console.log(req.body)
        const existData=await FoodDetail.findById({_id:req.body.foodId})
        console.log(existData.reviews)
        const infoExist=existData.reviews.some(rev=>rev.email===req.body.rating_email &&
          rev.rate>0
          )
        const bool=existData.reviews.some(rev=>rev.rate===req.body.rating)

        console.log(bool)
        console.log(infoExist)

       if(!infoExist){
        const resData=await FoodDetail.updateOne({_id:req.body.foodId},{
          $push:{
            reviews:{
            rate:req.body.rating || 0,
            comment:req.body.comment,
            email:req.body.rating_email,
            date:`${new Date().toDateString()} at ${new Date().toLocaleTimeString()}`}
      }
    })

    if(resData!==null){
    const resSendData=await FoodDetail.findById({_id:req.body.foodId})
    console.log(resSendData.reviews.length)
    res.status(200).send({data:resSendData})
    }

    }else{
      const resData=await FoodDetail.updateOne({_id:req.body.foodId},{
        $push:{
          reviews:{
         rate:0,
         comment:req.body.comment,
         email:req.body.rating_email,
         date:`${new Date().toDateString()} at ${new Date().toLocaleTimeString()}`}
    }
  })

  if(resData!==null){
    const resSendData=await FoodDetail.findById({_id:req.body.foodId})
    console.log(resSendData.reviews.length)
    res.status(200).send({data:resSendData})
  }



  console.log("you have already rated")
}

        


       

        
     }catch(e){
       
      } ;
  }

  


module.exports={
 addFood,
 getFoodsList,
 deleteFood,
 partialUpdate,
 searchFood,
 searchFoodBykey,
 review
}