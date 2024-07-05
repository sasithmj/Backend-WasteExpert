// AdminService.js

const Admin = require("../models/AdminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class AdminService {
  static async registerAdmin(username, email, password) {
    try {
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return { success: false, message: "Admin already exists" };
      }

      const newAdmin = new Admin({ username, email, password: password });
      await newAdmin.save();
      return { success: true, message: "Admin registered successfully" };
    } catch (error) {
      throw new Error("Error while registering admin");
    }
  }

  static async checkAdmin(email) {
    try {
      const existingAdmin = await Admin.findOne({ email });
      return existingAdmin;
    } catch (error) {
      throw error;
    }
  }

  static async generateToken(data, secretKey, jwtExp) {
    try {
      return jwt.sign(data, secretKey, { expiresIn: jwtExp });
    } catch (error) {
      throw error;
    }
  }

  
  static async addAdmin(adminData) {
    try {
      const newAdmin = new Admin(adminData);
      await newAdmin.save();
      return {
        success: true,
        message: "Added New Admin successfully",
      };
    } catch (error) {
      console.error("Error in AdminService.addAdmin:", error);
      return {
        success: false,
        message: "Error Adding New Admin",
      };
    }
  }
  
}

module.exports = AdminService;
