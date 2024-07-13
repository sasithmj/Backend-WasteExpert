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
      console.error("Error while registering admin:", error);
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

  static async getAllAdmin() {
    try {
      const admins = await Admin.find({});
      if (!admins) {
        return { success: false, message: "No Admin found" };
      }

      return {
        success: true,
        admins: admins.map((admin) => ({
          username: admin.username,
          fullName: admin.fullName,
          address: admin.address,
          email: admin.email,
          role: admin.role,
          jobs: admin.jobs,
        })),
      };
    } catch (error) {
      console.error("Error while fetching smartbin details:", error);
      throw new Error("Error while fetching smartbin details");
    }
  }
}

module.exports = AdminService;
