-- CreateEnum
CREATE TYPE "Result" AS ENUM ('WHITE_WIN', 'BLACK_WIN', 'DRAW');

-- CreateEnum
CREATE TYPE "TeminationType" AS ENUM ('CHECKMATE', 'RESIGNATION', 'TIMEOUT', 'STALEMATE', 'AGREED_DRAW');

-- CreateTable
CREATE TABLE "games" (
    "game_id" TEXT NOT NULL,
    "white_player_id" TEXT NOT NULL,
    "black_player_id" TEXT NOT NULL,
    "result" "Result" NOT NULL,
    "termination_type" "TeminationType" NOT NULL,
    "pgn" TEXT NOT NULL,
    "finished_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("game_id")
);
