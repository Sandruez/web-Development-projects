const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs"); //for password hashing
var jwt = require("jsonwebtoken"); //JWT=json web token
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "SecretSuper@123";

//Route1:Create a user using: POST "/api/auth/Createuser".Nologin required
router.post(
  "/Createuser",
  [
    //express_validations
    body("name", "name should have atleast 3 characters").isLength({ min: 3 }),
    body("password", "password should have atleast 5 characters").isLength({
      min: 5,
    }),
    body("email", "email should be valid").isEmail(),
  ],
  async (req, res) => {
    //if there are errors,return BAd request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //securing password using bcrypt npm with hash the password
    const salt = await bcrypt.genSalt(10);
    const SecPassword = await bcrypt.hash(req.body.password, salt);
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ errors: "Sorry a user with this email already exists" });
      }
      //Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: SecPassword,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const Authtoken = jwt.sign(data, JWT_SECRET);
      res.json(Authtoken);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server Error ");
    }
  }
);

//Route2: endpoint for usesr login..POST "/api/auth/login"..
router.post(
  '/login',
  [
    //express_validations
    body("email", "email should be valid").isEmail(),
    body("password", "password should not blank").exists(),
  ],async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}=req.body;
    try {
      let user = await User.findOne({email});
      if (!user) {
        return res
          .status(400)
          .json({ errors: "Please try to login with correct credentials" });
      }
      const passwordcomparison= await bcrypt.compare(password,user.password)
      if(!passwordcomparison){
        return res
          .status(400)
          .json({ errors: "Please try to login with correct credentials" });
      }

      const data={
        user:{
          id:user.id
        }
      }
      const Authtoken = jwt.sign(data, JWT_SECRET);
      res.json(Authtoken);

    } catch (errors) {
      console.log(errors.message);
      res.status(500).send("Internal server Error ");
    }
  }
  );

  //Route3: Get loggedin user details using :POST "/api/auth/getuser".Login required
  router.post('/getuser',fetchuser, async (req,res)=>{
      
    try {
      const userId=req.user.id;
      const user= await User.findById(userId).select("-password");
      res.send(user);
    } 
    catch (error) {
       console.log(error.message);
      res.status(500).send("Internal server Error ");
    }

    })


module.exports = router;
