const Collector = require("../models/CollectorModel");

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
}

module.exports = CollectorService;
