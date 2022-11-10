const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require("../model/user");
const post = require("../model/file")
const { body, validationResult } = require('express-validator');
const router = express.Router();
const secrete = "pankaj@98+27*3";



router.post("/login" ,body("email").isEmail(),async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "provide valide email" });
    }
 try{

    const email = req.body.email;
    const password = req.body.password;
    const userData = await user.findOne({email:email})
    if(userData != null){
        const input = await bcrypt.compare(password , userData.password);

        if(input){
            const token =  jwt.sign({
                exp: Math.floor(Date.now()/100)+(60*60) ,
                data:userData._id
            },secrete)

         res.status(200).json({
                token : token,
                userName: email
                })
        }else {
          return  res.status(400).json({
                message : "wrong password"
                })
        }
    }else {
      return  res.status(400).json({
            message : "email dont match ==> REGISTER"
            })
    }
 }catch(e){

    res.status(400).json({
       res:e.message
    })
 }
})

router.post("/register" ,body("email").isEmail(),async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "provide valide email" });
    }
 try{

    let pass =req.body.password
    pass = await bcrypt.hash(pass , 10)
    req.body.password=pass
    const data =await user.create(req.body)

     return res.status(200).json({
         message:"registration complited"
     })
   
 }catch(e){

    res.status(400).json({
       res:"email exist"
    })
 }
})


router.post("/upload", async (req, res) => {

   try {

      const token = req.headers.authorization
      const decoded = jwt.verify(token, secrete)
      const userData = await user.findOne({ _id: decoded.data })

      if (userData !== null) {
         const name = req.files.uploadFile.name
         req.body.file=name
         req.body.user = decoded.data

         const data = await post.create(req.body);
         const filedata= req.files.uploadFile
        
         filedata.mv("./uploads/"+ name)
         res.status(200).json({
            name:name,
            message: "added to the list"
         })
      }

   } catch (e) {

      res.status(400).json({
         res: " user is  already there"
      })
   }
})



router.get("/home", async (req, res) => {

   try {

      const token = req.headers.authorization
      const decoded = jwt.verify(token, secrete)
      const userData = await user.findOne({ _id: decoded.data })

      if (userData !== null) {

         const data = await post.find({user:decoded.data});
         res.status(200).json({
            data:data
         })
      }

   } catch (e) {

      res.status(400).json({
         res: " user is  already there"
      })
   }
})







module.exports= router