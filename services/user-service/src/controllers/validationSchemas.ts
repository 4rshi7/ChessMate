import { z } from 'zod';

// Define expected enum values matching your Prisma schema
const GameResultSchema = z.enum(['WIN', 'LOSS', 'DRAW']);
const TimeControlSchema = z.enum(['BLITZ', 'RAPID', 'CLASSICAL', 'BULLET']);
const PlayerColorSchema = z.enum(['WHITE', 'BLACK']); // Needed for game history

// Define the input validation schema for the request body
export const gameResultSchema = z.object({
  gameServiceId: z.string().uuid(),
  timeControl: TimeControlSchema,
  whitePlayer: z.object({
    authUserId: z.string(),
    username: z.string(),
    ratingBefore: z.number().int(),
    ratingAfter: z.number().int(),
    result: GameResultSchema,
  }),
  blackPlayer: z.object({
    authUserId: z.string(),
    username: z.string(),
    ratingBefore: z.number().int(),
    ratingAfter: z.number().int(),
    result: GameResultSchema,
  }),
});

// Infer the TypeScript type from the schema
export type GameResultInput = z.infer<typeof gameResultSchema>;