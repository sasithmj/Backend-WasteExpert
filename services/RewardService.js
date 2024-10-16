const GarbageWeightModel = require("../models/GarbageWeightModel");

class RewardService {
  static async getRewardsByUserId(userId) {
    try {
      const rewards = await GarbageWeightModel.find({ userId: userId });

      if (!rewards || rewards.length === 0) {
        return {
          success: false,
          message: "No rewards found for this user",
        };
      }

      return {
        success: true,
        rewards: rewards.map((reward) => ({
          _id: reward._id,
          wasteList: reward.wasteList,
          rewardPoints: reward.rewardPoints,
          scheduleId: reward.scheduleId,
          withdrawnRewards: reward.withdrawnRewards,
        })),
      };
    } catch (error) {
      console.error("Error while fetching rewards for user:", error);
      throw new Error("Error while fetching rewards for user");
    }
  }
}

module.exports = RewardService;
