import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// @route   POST /api/auth/register
export const register = async (req, res) => {
  const { name, email, password, mobileNumber } = req.body;

  try {
    if (!name || !email || !password || !mobileNumber) {
        return res.status(400).json({ message: "All fields are required" });
      }
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      mobileNumber
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// @route   POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate token    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
      res.cookie("token", token, {
        httpOnly: true,
        //secure: true, 
        secure: false, // true in production (HTTPS)
        //sameSite: "None", 
        sameSite:"Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
  
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobileNumber:user.mobileNumber,
      },
    });
    console.log(user)
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const changePassword = async (req,res) =>{
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Both fields are required" });
  }

  const user = await User.findById(req.user.userId);
  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Current password is incorrect" });
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedNewPassword;
  await user.save();

  res.json({ message: "Password updated successfully" });
}
