import { z } from 'zod';
export declare const gameResultSchema: z.ZodObject<{
    gameServiceId: z.ZodString;
    timeControl: z.ZodEnum<{
        BLITZ: "BLITZ";
        RAPID: "RAPID";
        CLASSICAL: "CLASSICAL";
        BULLET: "BULLET";
    }>;
    whitePlayer: z.ZodObject<{
        authUserId: z.ZodString;
        username: z.ZodString;
        ratingBefore: z.ZodNumber;
        ratingAfter: z.ZodNumber;
        result: z.ZodEnum<{
            WIN: "WIN";
            LOSS: "LOSS";
            DRAW: "DRAW";
        }>;
    }, z.core.$strip>;
    blackPlayer: z.ZodObject<{
        authUserId: z.ZodString;
        username: z.ZodString;
        ratingBefore: z.ZodNumber;
        ratingAfter: z.ZodNumber;
        result: z.ZodEnum<{
            WIN: "WIN";
            LOSS: "LOSS";
            DRAW: "DRAW";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type GameResultInput = z.infer<typeof gameResultSchema>;
//# sourceMappingURL=validationSchemas.d.ts.map