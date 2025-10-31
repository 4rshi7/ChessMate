export declare const GameResult: {
    readonly WIN: "WIN";
    readonly LOSS: "LOSS";
    readonly DRAW: "DRAW";
};
export type GameResult = (typeof GameResult)[keyof typeof GameResult];
export declare const PlayerColor: {
    readonly WHITE: "WHITE";
    readonly BLACK: "BLACK";
};
export type PlayerColor = (typeof PlayerColor)[keyof typeof PlayerColor];
export declare const TimeControl: {
    readonly BLITZ: "BLITZ";
    readonly RAPID: "RAPID";
    readonly CLASSICAL: "CLASSICAL";
    readonly BULLET: "BULLET";
};
export type TimeControl = (typeof TimeControl)[keyof typeof TimeControl];
//# sourceMappingURL=enums.d.ts.map