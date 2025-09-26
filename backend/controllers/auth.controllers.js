import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";
export const signUp = async(req,res)=>{
  try {
    const { fullName, email, password, mobile, role } = req.body;
  

    let existingUser = await User.findOne({email})
    if(existingUser){
      return res.status(400).json({message:"User Already exist !"})
    }

    if(password.length < 6){
      return res.status(400).json({message:"Password must be at least 6 characters!"})
    }

    if(mobile.length < 10){
      return res.status(400).json({message:"Mobile number must be at least 10 digits!"})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = await User.create({
      fullName,email,role,mobile,password:hashedPassword
    })

    const token = await genToken(newUser._id)

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: false
    })

    return res.status(201).json(newUser)
  } catch (error) {
    return res.status(500).json({message : `SignUp Error ${error}`})
  }
}


export const signIn = async(req,res)=>{
  try {
    
    const {email,password} = req.body;
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({message:"User doesn't exist !"})
    }
  
const isMatch = await bcrypt.compare(password,user.password)

if(!isMatch){
  return res.status(400).json({message:"Incorret Password"})
}

        const token = await genToken(user._id)

          res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: false
    });

    return res.status(201).json(user)
  } catch (error) {
    
    return res.status(500).json({message : `SignIn Error ${error}`})
  }
}

export const signOut = async(req,res)=>{
  try {
    res.clearCookie("token")
    return res.status(200).json({message:"LogOut Successfully "})
  } catch (error) {
     return res.status(500).json({message : `LogOut Error ${error}`})
  }
}


export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found " });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    (user.resetOtp = otp),
      (user.otpExpires = Date.now() + 5 * 60 * 1000),
      (user.isOtpVerified = false);

    await user.save();

    await sendOtpMail(email, otp);
    return res.status(200).json({ message: "OTP Send Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `send otp  error ${error}` });
  }
};

export const verifyOTp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    console.log("User from DB:", user?.resetOtp, "Expires:", user?.otpExpires);
    console.log("OTP from client:", otp);

    if (
      !user ||
      user.resetOtp !== String(otp) || // ensure string compare
      !user.otpExpires ||
      user.otpExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "OTP Verified Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `otp error ${error.message}` });
  }
};
 
export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // user find karo
    const user = await User.findOne({ email });

    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "OTP Verification is Required" });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false; // reset otpVerified flag

    await user.save();

    return res.status(200).json({ message: "Reset Password Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `reset password error: ${error.message}` });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, mobile ,role} = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
      fullName, email, mobile,role
      });
    }

    let token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `google sigunp error: ${error.message}` });
  }
};
