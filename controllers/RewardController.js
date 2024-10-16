const RewardService = require("../services/RewardService");
const User = require("../models/Usermodel");

exports.getRewards = async (req, res, next) => {
  try {
    const { userId } = req.body; // Assuming you have user info in the request after authentication
    const rewardsRes = await RewardService.getRewardsByUserId(userId);

    if (rewardsRes.success) {
      res.status(200).json({ status: true, rewards: rewardsRes.rewards });
    } else {
      res.status(404).json({ status: false, message: rewardsRes.message });
    }
  } catch (error) {
    console.error("Get Rewards Error:", error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};
