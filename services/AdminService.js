// AdminService.js
const GarbageWeightModel = require("../models/GarbageWeightModel");
const Admin = require("../models/AdminModel");
const UserModel = require("../models/Usermodel");
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
          _id: admin._id,
          username: admin.username,
          fullName: admin.fullName,
          address: admin.address,
          email: admin.email,
          phoneNum: admin.phoneNum,
          role: admin.role,
          jobs: admin.jobs,
        })),
      };
    } catch (error) {
      console.error("Error while fetching smartbin details:", error);
      throw new Error("Error while fetching smartbin details");
    }
  }

  static async getRewards() {
    try {
      const rewards = await GarbageWeightModel.find({}).populate({
        path: "userId",
        model: UserModel, // Use the UserModel explicitly
      });

      return {
        success: true,
        rewards: rewards.map((reward) => ({
          userId: reward.userId._id,
          currentBalance: reward.rewardPoints,
          withdrawnRewards: reward.withdrawnRewards,
        })),
      };
    } catch (error) {
      console.error("Error fetching rewards:", error);
      return { success: false, message: "Error fetching rewards" };
    }
  }

  static async deleteAdmin(_id) {
    try {
      const deletedAdmin = await Admin.findByIdAndDelete(_id);

      if (!deletedAdmin) {
        return { success: false, message: "Admin not found" };
      }

      return { success: true, message: "Admin deleted successfully" };
    } catch (error) {
      console.error("Error while deleting admin:", error);
      throw new Error("Error while deleting admin");
    }
  }

  static async updateAdmin(_id, updateData) {
    try {
      const { fullName, address, phoneNum, email, role } = updateData;

      // Only update the fields that are provided
      const updatedAdmin = await Admin.findByIdAndUpdate(
        _id,
        { fullName, address, phoneNum, email, role },
        { new: true, runValidators: true } // 'new' returns the updated document, 'runValidators' ensures validation is applied
      );

      if (!updatedAdmin) {
        return { success: false, message: "Admin not found" };
      }

      return {
        success: true,
        message: "Admin updated successfully",
        admin: updatedAdmin,
      };
    } catch (error) {
      console.error("Error while updating admin:", error);
      return { success: false, message: "Error updating admin" };
    }
  }

  static async updateAdminbyUser(_id, updateData) {
    try {
      const { fullName, address, phoneNum, email } = updateData;

      // Only update the fields that are provided
      const updatedAdmin = await Admin.findByIdAndUpdate(
        _id,
        { fullName, address, phoneNum, email },
        { new: true, runValidators: true } // 'new' returns the updated document, 'runValidators' ensures validation is applied
      );

      if (!updatedAdmin) {
        return { success: false, message: "Admin not found" };
      }

      return {
        success: true,
        message: "Updated successfully",
        admin: updatedAdmin,
      };
    } catch (error) {
      console.error("Error while updating:", error);
      return { success: false, message: "Error updating" };
    }
  }

  static async checkAdminById(_id) {
    try {
      const admin = await Admin.findById(_id);
      return admin; // Returns admin document or null if not found
    } catch (error) {
      console.error("Error while checking admin by ID:", error);
      throw error; // Propagate the error up the call stack
    }
  }

  static async changeAdminPassword(_id, newPassword) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const updatedAdmin = await Admin.findByIdAndUpdate(
        _id,
        { password: hashedPassword },
        { new: true, runValidators: true }
      );

      if (!updatedAdmin) {
        return { success: false, message: "Admin not found" };
      }

      return { success: true, message: "Password updated successfully" };
    } catch (error) {
      console.error("Error changing password:", error);
      return { success: false, message: "Error updating password" };
    }
  }
  static async getAdminById(id) {
    try {
      const admin = await Admin.findById(id).select("-password"); // Exclude the password field
      if (!admin) {
        return { success: false, message: "Admin not found" };
      }
      return { success: true, user: admin };
    } catch (error) {
      console.error("Error while fetching admin details:", error);
      throw new Error("Error while fetching admin details");
    }
  }
}

module.exports = AdminService;
