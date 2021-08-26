const express = require('express');
const cors = require('cors');
require("./server")
const fileUpload=require('express-fileupload');
// const FoodDetail=require("./models/foods");
const bodyParser = require('body-parser');
const foodRoutes=require('./routers/foodRoutes')
const orderRoutes=require('./routers/orderRoutes')
const userRoutes=require('./routers/userRoutes')
const adminRoutes=require('./routers/adminRoutes')
// const {addFood}=require("./controllers/foodController")

const port=process.env.PORT ||5000

const app =express()


// app.use(express.json());
app.use(express.json({
  limit: '50mb'
}));

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ 
//   limit: '50mb',
//   extended: true }));

app.use(express.static('foodImg')); 
app.use(fileUpload());

app.use(('/api/food') ,foodRoutes)
app.use(('/api/order') ,orderRoutes)
app.use(('/api/user'), userRoutes)
app.use(('/api/admin'), adminRoutes)


//without file base64

// app.post('/foods', (req , res)=>{
// //  console.log(req.body)
//  const file=req.files.file;
 
//  console.log(file)

//   file.mv(`${__dirname}/foodImg/${file.name}`,err=>{
//   if(err){
//    console.log(err)
//    return res.status(500).send({msg:"Falied to upload"})
//   }
//   const foodImg =Foods.create({img:file.name})

//   // without instatnt response*********************
// //  .then((response)=>
 
// //  {
// //   res.status(201).json({
// //     status: 'success',
// //     data: {
// //       response
// //     },
// //   });
// //  } 
// //  )
//   // console.log(foodImg)

//   //With Instant response************************
//   res.status(201).json({
//     status: 'success',
//     data: {
//       foodImg
//     },
//   });
  
// })



 
// })

// app.post('/foodDetail', (req , res)=>{
  //  console.log(req.body)
  //  const file=req.files.file;

  //2ND WAY THEESE CODE START

  // const image_link = req.body.image_link;
  //  console.log(image_link)
  //  const foodImg=Foods.create({img:image_link})

  //  res.status(201).json({
  //       status: 'success',
  //       data: {
  //         foodImg
  //       },
  //     });

//2ND WAY END 

//no need bellow code
    // file.mv(`${__dirname}/foodImg/${file.name}`,err=>{
    // if(err){
    //  console.log(err)
    //  return res.status(500).send({msg:"Falied to upload"})
    // }
    // const foodImg =Foods.create({img:file.name})
  
    // without instatnt response*********************
  //  .then((response)=>
   
  //  {
  //   res.status(201).json({
  //     status: 'success',
  //     data: {
  //       response
  //     },
  //   });
  //  } 
  //  )
    // console.log(foodImg)
  
    //With Instant response************************
  //   res.status(201).json({
  //     status: 'success',
  //     data: {
  //       foodImg
  //     },
  //   });
    
  // })



  //3RD WAY

        // const file = req.files.file;
        
        
        // const newImg = file.data;
        // const encImg = newImg.toString('base64');

        // var image = {
        //     contentType: file.mimetype,
        //     size: file.size,
        //     img: Buffer.from(encImg, 'base64')
        // };
        // console.log(image.contentType.slice(0,5))

        // const foodImg= image.contentType.slice(0,5)==="image" ? Foods.create({img:image}) :"you should upload a Image"
        // // const foodImg =Foods.create({img:image})

        // res.status(201).json({
        //       status: 'success',
        //       data: {
        //         foodImg
        //       },
        //     });



  
  
  
   
  // })

  // app.post('/fooddetail' , addFood)
  


  app.get('/',(req,res)=>{
    res.send("Welcome to Newaz Kitchen API-2021")
   })



// app.get('/foods', async(req,res)=>{
//   const foods = await Foods.find()
//   res.status(200).json({
//     status: 'success',
//     // results: foods.length,
//     data: {
//       foods,
//     },
//   });
// })

//server listen
app.listen( port , ()=>console.log(`Server listening from  ${port}`)) ;