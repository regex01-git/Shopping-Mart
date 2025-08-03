const mongoose=require('mongoose');
const joi=require('joi')
const productSchema=new mongoose.Schema({
    name:{type:String,required:true,},
    brand:{type:String,required:true,},
    desc:{type:String,required:true,},
    price:{type:Number,required:true,},
    image:{type:Object,required:true,},
},{
    timestamps:true
})
const Product=mongoose.model('Product',productSchema)
exports.Product=Product;