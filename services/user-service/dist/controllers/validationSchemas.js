"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameResultSchema = void 0;
const zod_1 = require("zod");
// Define expected enum values matching your Prisma schema
const GameResultSchema = zod_1.z.enum(['WIN', 'LOSS', 'DRAW']);
const TimeControlSchema = zod_1.z.enum(['BLITZ', 'RAPID', 'CLASSICAL', 'BULLET']);
const PlayerColorSchema = zod_1.z.enum(['WHITE', 'BLACK']); // Needed for game history
// Define the input validation schema for the request body
exports.gameResultSchema = zod_1.z.object({
    gameServiceId: zod_1.z.string().uuid(),
    timeControl: TimeControlSchema,
    whitePlayer: zod_1.z.object({
        authUserId: zod_1.z.string(),
        username: zod_1.z.string(),
        ratingBefore: zod_1.z.number().int(),
        ratingAfter: zod_1.z.number().int(),
        result: GameResultSchema,
    }),
    blackPlayer: zod_1.z.object({
        authUserId: zod_1.z.string(),
        username: zod_1.z.string(),
        ratingBefore: zod_1.z.number().int(),
        ratingAfter: zod_1.z.number().int(),
        result: GameResultSchema,
    }),
});
//# sourceMappingURL=validationSchemas.js.map