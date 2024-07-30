const Collector = require("../models/CollectorModel");
const User = require('../models/Usermodel');
const AdminService = require('./AdminService');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const GarbageWeight = require('../models/GarbageWeightModel'); // Add this line to import the new model

const GarbageWeightModel = require("../models/GarbageWeightModel");
class CollectorService {
  static async loginCollector(username, password) {
    try {
      // Find collector by username
      const collector = await Collector.findOne({ username });
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
        { _id: collector._id, username: collector.username },
        "secretkey",
        { expiresIn: "120h" }
      );

      return { success: true, token };
    } catch (error) {
      console.error("Error in loginCollector:", error);
      throw error;
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
          id: collector.id,
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
      for (let waste of wasteList) {
        const { quantity, wasteType } = waste;

        const rewardPoints = calculateRewardPoints(quantity, wasteType);

        const garbageWeight = new GarbageWeightModel({
          userId,
          quantity,
          wasteType,
          rewardPoints,
          scheduleId,
          withdrawnRewards: 0,
        });

        await garbageWeight.save();
      }

      return { success: true, message: "Garbage weight added successfully" };
    } catch (error) {
      console.error("Error adding garbage weight:", error);
      return { success: false, message: "Error adding garbage weight" };
    }
  }
}

function calculateRewardPoints(quantity, wasteType) {
  const pointRates = {
    Organic: 10,
    Glass: 5,
    Metal: 20,
    Paper: 10,
    Plastic: 15
  };
  return quantity * (pointRates[wasteType] || 0);
}

module.exports = CollectorService;
