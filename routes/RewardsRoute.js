const route = require("express").Router();
const rewardController = require("../controllers/RewardController");

route.post("/getUserRewards", rewardController.getRewards);

module.exports = route;
