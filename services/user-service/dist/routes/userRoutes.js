"use strict";
// authentication of requests is not needed but authorization is needed
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const router = (0, express_1.Router)();
router.get('/internal/users/by-auth-id/:authUserId', userControllers_1.getUserByAuthUserId);
router.post('/internal/users', userControllers_1.createUser);
router.get('/users', userControllers_1.getAllUsers);
router.get('/leaderboard/:timeControl', userControllers_1.getLeaderboard);
router.get('/users/:userId', userControllers_1.getUserById);
router.patch('/users/:userId', userControllers_1.updateUser);
router.delete('/users/:userId', userControllers_1.deleteUser);
router.get('users/:userId/games', userControllers_1.getUserGames);
router.post('internal/game-result', userControllers_1.updateProfilesAfterGame);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map