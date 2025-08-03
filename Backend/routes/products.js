const express = require('express')
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const { Product } = require('../Models/product');
const joi = require('joi')
const upload=require('../utils/multer');
const isAdmin = require('../middleware/auth');

// CREATE PRODUCT ROUTE

router.post('/',isAdmin,upload.single('image'),async (req, res) => {
    console.log(req.file)
    // const validation = joi.object({
    //     name:joi.string().required(),
    //     brand:joi.string().required(),
    //     desc:joi.string().required(),
    //     price:joi.number().required(),
    //     image:joi.required()
    // })
    // const {err}=validation.validate(req.body)
    // if(err){
    //     return res.status(400).send(err.details[0].message)
    // }

    const { name, brand, desc, price } = req.body;
    try {
        if (req.file) {
            const base64Str = req.file.buffer.toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${base64Str}`;

            console.log("fardeen dvdwvdvdsvkhan 122345")
            console.log("fardeen",req.file)
            const upload_res = await cloudinary.uploader.upload(dataURI, {
                upload_preset: "online-shop"
            })
            if (upload_res) {
                const product = new Product({
                    name,
                    brand,
                    desc,
                    price,
                    image: upload_res
                })
                const savedProduct = await product.save();
                // console.log("done")
                res.status(200).send(savedProduct);
            }
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})
router.get('/',async(req,res)=>{
    try{
        const products=await Product.find()
        res.status(200).send(products)
    }catch(err){
        console.log(err)
        return res.send(500).send(err)
    }
})

module.exports = router;