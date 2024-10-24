const Collector = require("../models/CollectorModel");
const User = require("../models/Usermodel");
const AdminService = require("./AdminService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const GarbageWeight = require("../models/GarbageWeightModel"); // Add this line to import the new model

const GarbageWeightModel = require("../models/GarbageWeightModel");

class CollectorService {
  static async loginCollector(email, password) {
    try {
      // Find collector by username
      const collector = await Collector.findOne({ email });
      if (!collector) {
        return { success: false, message: "Collector not found" };
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, collector.password);
      if (!isMatch) {
        return { success: false, message: "Invalid password" };
      }

      // Generate token
      const token = await jwt.sign(
        {
          _id: collector._id,
          username: collector.username,
          userType: "collector",
        },
        "secretkey",
        { expiresIn: "120h" }
      );

      return { success: true, token };
    } catch (error) {
      console.error("Error in loginCollector:", error);
      throw error;
    }
  }

  static async checkCollector(email) {
    try {
      const existingCollector = await Collector.findOne({ email });
      return existingCollector; // Returns collector if found, or null if not found
    } catch (error) {
      console.error("Error in CollectorService.checkCollector:", error);
      throw error; // Propagate the error to the controller
    }
  }

  

  static async addCollector(collectorData) {
    try {
      const newCollector = new Collector(collectorData);
      await newCollector.save();
      return {
        success: true,
        message: "Added New Collector successfully",
      };
    } catch (error) {
      console.error("Error in CollectorService.addCollector:", error);
      return {
        success: false,
        message: "Error Adding New Collector",
      };
    }
  }

  static async getAllCol() {
    try {
      const collectors = await Collector.find({});
      if (!collectors) {
        return { success: false, message: "No collectors found" };
      }

      return {
        success: true,
        collectors: collectors.map((collector) => ({
          _id: collector._id,
          username: collector.username,
          fullName: collector.fullName,
          address: collector.address,
          phoneNum: collector.phoneNum,
          email: collector.email,
          vehicalNo: collector.vehicalNo,
        })),
      };
    } catch (error) {
      console.error("Error while fetching collector details:", error);
      throw new Error("Error while fetching collector details");
    }
  }

  static async addGarbageWeight(userId, wasteList, scheduleId) {
    try {
      let totalRewardPoints = 0;

      for (let waste of wasteList) {
        const { quantity, wasteType } = waste;
        totalRewardPoints += calculateRewardPoints(quantity, wasteType);
      }

      const garbageWeight = new GarbageWeightModel({
        userId,
        wasteList,
        rewardPoints: totalRewardPoints,
        scheduleId,
        withdrawnRewards: 0,
      });

      await garbageWeight.save();

      return { success: true, message: "Garbage weight added successfully" };
    } catch (error) {
      console.error("Error adding garbage weight:", error);
      return { success: false, message: "Error adding garbage weight" };
    }
  }

  static async deleteCollector(_id) {
    try {
      const deletedCollector = await Collector.findByIdAndDelete(_id);

      if (!deletedCollector) {
        return { success: false, message: "Collector not found" };
      }

      return { success: true, message: "Collector deleted successfully" };
    } catch (error) {
      console.error("Error while deleting collector:", error);
      throw new Error("Error while deleting collector");
    }
  }

  static async updateCollector(_id, updateData) {
    try {
      const { fullName, address, phoneNum, email, vehicalNo } = updateData;

      // Only update the fields that are provided
      const updatedCollector = await Collector.findByIdAndUpdate(
        _id,
        { fullName, address, phoneNum, email, vehicalNo },
        { new: true, runValidators: true } // 'new' returns the updated document, 'runValidators' ensures validation is applied
      );

      if (!updatedCollector) {
        return { success: false, message: "Collector not found" };
      }

      return {
        success: true,
        message: "Collector updated successfully",
        collector: updatedCollector,
      };
    } catch (error) {
      console.error("Error while updating collector:", error);
      return { success: false, message: "Error updating collector" };
    }
  }

  static async updateCollectorbyUser(_id, updateData) {
    try {
      const { fullName, address, phoneNum, email, vehicalNo } = updateData;

      // Only update the fields that are provided
      const updatedCollector = await Collector.findByIdAndUpdate(
        _id,
        { fullName, address, phoneNum, email, vehicalNo },
        { new: true, runValidators: true } // 'new' returns the updated document, 'runValidators' ensures validation is applied
      );

      if (!updatedCollector) {
        return { success: false, message: "Collector not found" };
      }

      return {
        success: true,
        message: "Updated successfully",
        collector: updatedCollector,
      };
    } catch (error) {
      console.error("Error while updating:", error);
      return { success: false, message: "Error updating" };
    }
  }

  static async checkCollectorById(_id) {
    try {
      const collector = await Collector.findById(_id);
      return collector; // Returns collector document or null if not found
    } catch (error) {
      console.error("Error while checking collector by ID:", error);
      throw error; // Propagate the error up the call stack
    }
  }

  static async changeCollectorPassword(_id, newPassword) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const updatedCollector = await Collector.findByIdAndUpdate(
        _id,
        { password: hashedPassword },
        { new: true, runValidators: true }
      );

      if (!updatedCollector) {
        return { success: false, message: "Collector not found" };
      }

      return { success: true, message: "Password updated successfully" };
    } catch (error) {
      console.error("Error changing password:", error);
      return { success: false, message: "Error updating password" };
    }
  }

  static async getCollectorById(id) {
    try {
      const collector = await Collector.findById(id).select("-password"); // Exclude the password field
      if (!collector) {
        return { success: false, message: "Collector not found" };
      }
      return { success: true, user: collector };
    } catch (error) {
      console.error("Error while fetching collector details:", error);
      throw new Error("Error while fetching collector details");
    }
  }
}


function calculateRewardPoints(quantity, wasteType) {
  const pointRates = {
    Organic: 10,
    Glass: 5,
    Metal: 20,
    Paper: 10,
    Plastic: 15,
  };
  return quantity * (pointRates[wasteType] || 0);
}





module.exports = CollectorService;
