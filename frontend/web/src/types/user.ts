
export interface Rating {
  blitz: number;
  rapid: number;
  classical: number;
}

export interface Statistics {
  totalGames: number;
  wins: number;
  losses: number;
  draws: number;
}

export interface Game {
  id: string;
  gameServiceId: string;
  opponentAuthId: string;
  opponentUsername: string;
  opponentRating: number;
  userColor: "WHITE" | "BLACK";
  result: "WIN" | "LOSS" | "DRAW";
  timeControl: "BLITZ" | "RAPID" | "CLASSICAL" | "BULLET";
  playedAt: string;
}

export interface User {
  id: string;
  authUserId: string;
  username: string;
  displayName: string;
  photoUrl?: string;
  country?: string;
  status: string;
  dateJoined: string;
  preferences?: Record<string, unknown>;
  ratings?: Rating;
  statistics?: Statistics;
  gameHistory?: Game[];
}
