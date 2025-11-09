"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfilesAfterGame = exports.getUserGames = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getLeaderboard = exports.getAllUsers = exports.createUser = exports.getUserByAuthUserId = void 0;
const db_1 = __importDefault(require("../db/db"));
const validationSchemas_1 = require("./validationSchemas");
// import { Rating } from '../generated/prisma/browser';
const getUserByAuthUserId = async (req, res) => {
    const { authUserId } = req.params;
    if (!authUserId || typeof authUserId !== 'string') {
        return res.status(400).json({ error: "Username is required" });
    }
    const user = await db_1.default.user.findUnique({
        where: { authUserId: authUserId },
    });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
};
exports.getUserByAuthUserId = getUserByAuthUserId;
const createUser = async (req, res) => {
    const { authUserId, username } = req.body;
    if (!authUserId || !username) {
        return res.status(400).json({ message: 'authUserId and username are required' });
    }
    try {
        const newUserProfile = await db_1.default.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    authUserId: authUserId,
                    username: username,
                    displayName: username,
                },
            });
            await tx.rating.create({
                data: {
                    userId: user.id,
                },
            });
            await tx.statistics.create({
                data: {
                    userId: user.id,
                },
            });
            return user;
        });
        console.log(`User profile created for ${username} (AuthID: ${authUserId})`);
        res.status(201).json(newUserProfile);
    }
    catch (error) {
        if (error.code === 'P2002') {
            const target = error.meta?.target; // e.g., ['username'] or ['authUserId']
            console.error(`Unique constraint violation on ${target}:`, error);
            return res.status(400).json({
                message: target?.includes('username')
                    ? 'Username already exists.'
                    : 'User with this authentication ID already has a profile.'
            });
        }
        // Log other unexpected errors
        console.error("Error creating user profile:", error);
        res.status(500).json({ message: 'Failed to create user profile', error: error.message });
    }
};
exports.createUser = createUser;
const getAllUsers = async (req, res) => {
    try {
        const users = await db_1.default.user.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
};
exports.getAllUsers = getAllUsers;
// confirm correctness of this controller later
const getLeaderboard = async (req, res) => {
    const { timeControl } = req.params;
    if (!timeControl || typeof timeControl !== 'string') {
        return res.status(400).json({ error: "timeControl is required" });
    }
    try {
        const leaderboard = await db_1.default.user.findMany({
            orderBy: {
                ratings: {
                    [timeControl]: 'desc'
                }
            },
            take: 100,
        });
        res.status(200).json(leaderboard);
    }
    catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ message: 'Failed to fetch leaderboard', error });
    }
};
exports.getLeaderboard = getLeaderboard;
const getUserById = async (req, res) => {
    const username = req.params.userId;
    if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: "Username is required" });
    }
    try {
        const user = await db_1.default.user.findUnique({
            where: { username: username },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error("Error fetching user by userId:", error);
        res.status(500).json({ message: 'Failed to fetch user', error });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    const username = req.params.userId;
    if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: "Username is required" });
    }
    try {
        const user = await db_1.default.user.findUnique({
            where: { username: username },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedData = req.body;
        const updatedUser = await db_1.default.user.update({
            where: { username: username },
            data: updatedData,
        });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        if (error.code === 'P2002') {
            const target = error.meta?.target;
            console.error(`Unique constraint violation on ${target}:`, error);
            return res.status(400).json({
                message: target?.includes('username')
                    ? 'Username already exists.'
                    : 'Unique constraint violation.'
            });
        }
        console.error("Error updating user:", error);
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ error: "Username is required" });
    }
    try {
        await db_1.default.user.delete({
            where: { username: userId },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: 'Failed to delete user', error });
    }
};
exports.deleteUser = deleteUser;
const getUserGames = async (req, res) => {
    const username = req.params.userId;
    if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: "Username is required" });
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    try {
        const user = await db_1.default.user.findUnique({
            where: { username: username },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const gameHistory = await db_1.default.game.findMany({
            where: { userId: user.id },
            orderBy: { playedAt: 'desc' }, // Show most recent games first
            skip: skip,
            take: limit,
        });
        const totalGames = await db_1.default.game.count({
            where: { userId: user.id },
        });
        res.status(200).json({
            games: gameHistory,
            currentPage: page,
            totalPages: Math.ceil(totalGames / limit),
            totalGames: totalGames
        });
    }
    catch (error) {
        console.error("Error fetching game history:", error);
        res.status(500).json({ message: 'Failed to fetch game history', error: error.message });
    }
};
exports.getUserGames = getUserGames;
const updateProfilesAfterGame = async (req, res) => {
    const validation = validationSchemas_1.gameResultSchema.safeParse(req.body);
    if (!validation.success) {
        // Using validation.error here
        return res.status(400).json({ message: 'Invalid input data', errors: validation.error.issues });
    }
    const { gameServiceId, timeControl, whitePlayer, blackPlayer, } = validation.data;
    const ratingField = timeControl.toLowerCase(); // i don't understand this shiiiiii
    try {
        await db_1.default.$transaction(async (tx) => {
            // Fetch both users first to get their internal IDs
            const userWhite = await tx.user.findUnique({
                where: { authUserId: whitePlayer.authUserId },
                select: { id: true }
            });
            const userBlack = await tx.user.findUnique({
                where: { authUserId: blackPlayer.authUserId },
                select: { id: true }
            });
            if (!userWhite || !userBlack) {
                throw new Error('One or both players not found in User Service.');
            }
            await tx.rating.update({
                where: { userId: userWhite.id },
                data: { [ratingField]: whitePlayer.ratingAfter }, // Use dynamic key based on timeControl
            });
            await tx.rating.update({
                where: { userId: userBlack.id },
                data: { [ratingField]: blackPlayer.ratingAfter },
            });
            await tx.statistics.update({
                where: { userId: userWhite.id },
                data: {
                    totalGames: { increment: 1 },
                    ...(whitePlayer.result === 'WIN' && { wins: { increment: 1 } }),
                    ...(whitePlayer.result === 'LOSS' && { losses: { increment: 1 } }),
                    ...(whitePlayer.result === 'DRAW' && { draws: { increment: 1 } })
                },
            });
            await tx.statistics.update({
                where: { userId: userBlack.id },
                data: {
                    totalGames: { increment: 1 },
                    ...(blackPlayer.result === 'WIN' && { wins: { increment: 1 } }),
                    ...(blackPlayer.result === 'LOSS' && { losses: { increment: 1 } }),
                    ...(blackPlayer.result === 'DRAW' && { draws: { increment: 1 } })
                },
            });
            // 5. Create Game History records for both players
            await tx.game.create({
                data: {
                    userId: userWhite.id,
                    gameServiceId: gameServiceId,
                    opponentAuthId: blackPlayer.authUserId,
                    opponentUsername: blackPlayer.username,
                    opponentRating: blackPlayer.ratingBefore, // using before rating here
                    userColor: 'WHITE',
                    result: whitePlayer.result,
                    timeControl: timeControl,
                    // playedAt uses default now()
                },
            });
            await tx.game.create({
                data: {
                    userId: userBlack.id,
                    gameServiceId: gameServiceId,
                    opponentAuthId: whitePlayer.authUserId,
                    opponentUsername: whitePlayer.username,
                    opponentRating: whitePlayer.ratingBefore,
                    userColor: 'BLACK',
                    result: blackPlayer.result,
                    timeControl: timeControl,
                    // playedAt uses default now()
                },
            });
        }); // End of transaction
        console.log(`Successfully processed game result: ${gameServiceId}`);
        res.status(200).json({ message: 'Game result processed successfully.' });
    }
    catch (error) {
        console.error("Error processing game result:", error);
        res.status(500).json({ message: 'Failed to process game result', error: error.message });
    }
};
exports.updateProfilesAfterGame = updateProfilesAfterGame;
//# sourceMappingURL=userControllers.js.map