const Collector = require("../models/CollectorModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
}

module.exports = CollectorService;
