// authentication of requests is not needed but authorization is needed

import { Router } from 'express';
import { createUser, getAllUsers, getUserByAuthUserId,getLeaderboard,getUserById,updateUser,deleteUser,getUserGames,updateProfilesAfterGame} from '../controllers/userControllers';


const router = Router();
router.get('/internal/users/by-auth-id/:authUserId', getUserByAuthUserId);
router.post('/internal/users', createUser);
router.get('/users', getAllUsers);
router.get('/leaderboard/:timeControl', getLeaderboard);
router.get('/users/:userId', getUserById);
router.patch('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);
router.get('users/:userId/games', getUserGames);
router.post('internal/game-result',updateProfilesAfterGame);

export default router;
