const User = require("../models/Usermodel");
const jwt = require("jsonwebtoken");

class UserService {
  static async registerUser(name, email, password, mobile) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [{ email: email }, { mobile: mobile }],
      });
      if (existingUser) {
        return { success: false, message: "User already exists" };
      }

      // If user doesn't exist, create a new user
      const newUser = new User({ name, email, password, mobile });
      await newUser.save();
      return { success: true, message: "User registered successfully" };
    } catch (error) {
      throw new Error("Error while registering user");
    }
  }

  static async checkUser(email) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      return existingUser;
    } catch (error) {
      throw error;
    }
  }

  static async genarateToken(data, secretkey, jwtExp) {
    return jwt.sign(data, secretkey, { expiresIn: jwtExp });
  }
}

module.exports = UserService;
