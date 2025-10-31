"use strict";
// authentication of requests is not needed but authorization is needed
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const router = (0, express_1.Router)();
// router.get('/internal/users/by-auth-id/:authUserId', getUserByAuthUserId);
router.post('/internal/users', userControllers_1.createUser);
// router.get('/users', getAllUsers);
// router.get('/leaderboard', getLeaderboard);
// router.get('/users/:id', getUserById);
// router.patch('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);
// router.get('users/:id/games', getUserGames);
// router.post('internal/game-result',updateProfilesAfterGame);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map