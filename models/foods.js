const mongoose = require('mongoose');

const FoodDetailSchema = new mongoose.Schema({
   foodTitle: {
      type: String,
      uppercase:true,
      trim: true,
      required: true      
    },

    foodType: {
      type: String,
      lowercase:true,
      trim: true,       
      required: true
    },

    description: {
      type: String,
      trim: true,       
      required: true
    },

    price: {
      type: Number,
      trim: true,       
      required: true
    }, 

    imageUrl:{
      type:String,
      trim: true,
      required: true   
    },   
    Local_Date:{
      type:String
    },
    Local_Time:{
      type:String
    },
    Int_Date:{
      type:Date,
      default:new Date(Date.now()).toLocaleString()
    },

    
});

const FoodDetail = mongoose.model('FoodCollection', FoodDetailSchema);


module.exports = FoodDetail;