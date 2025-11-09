import { Request, Response } from 'express';
export declare const getUserByAuthUserId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllUsers: (req: Request, res: Response) => Promise<void>;
export declare const getLeaderboard: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserGames: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateProfilesAfterGame: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=userControllers.d.ts.map