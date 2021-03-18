const FoodDetail=require("../models/foods");



//ADD FOOD

const addFood=async(req , res)=>{
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

//  .then((response)=>
//     {
//       res.status(201).json({
//         status: 'success',
//         data: {
//         response
//         },
//       });
//     } 
//     )

}

const getFoodsList=async(req,res)=>{
 try{
  const response=await FoodDetail.find()
  res.status(200).send(response)
  }catch(e){
    console.log(`Error from Server ${e}`)
  } ;
  
}


module.exports={
 addFood,
 getFoodsList
}