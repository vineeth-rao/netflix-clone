import { User } from "../models/user.model.js";
import bcryptjs from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are required" });
    }

    const emailRegex = /^[^\s]+@[^\s@]+\.[^\s@]+$/;
    // Check for Valid Email
    if (!emailRegex.test(email))
      return res.status(400).json({ success: false, message: "Invalid Email" });
    // Password Length
    if (password.length < 6)
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 6 characters",
      });

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });

    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername)
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });

    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully!!!",
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.error("Error in auth process", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Required!" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Username Or Password" });
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Username Or Password" });
    }
    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({
      success: true,
      message: "Login Successfull!",
      user: { ...user._doc, password: "" },
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix");
    return res
      .status(200)
      .json({ success: true, message: "Logout Successfull!" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function authCheck(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in authCheck controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
