const bcrypt = require("bcryptjs");
const jwt =require('jsonwebtoken')
const User = require("../models/User");


const register = async (req, res) => {
    try {
        console.log("===== Register API Called =====");
        console.log(req.body);

        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        console.log("Existing User:", existingUser);

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        console.log("Before Save");

        await user.save();

        console.log("After Save");

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user,
        });

    } catch (error) {
        console.log("Register Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const login = async (req,res)=>{
    try{
     const {email ,password}=req.body;
   const user = await User.findOne({ email });
    if(!user){
        return res.status(400).json({
            success:false,
            message:"Invalid Email or Password"
        })
    }
    const isMatch =await bcrypt.compare(password , user.password);
    if(!isMatch){
       return res.status(400).json({
            success:false,
            message:"Invalid Email or Password"
        });
    }
    const token =jwt.sign(
        {id:user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );

        res.status(200).json({
            success: true,
            message: "Login Successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    register,
    login
};