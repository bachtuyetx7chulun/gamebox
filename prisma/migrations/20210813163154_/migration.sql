-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GameRoom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "playerCount" INTEGER,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameId" INTEGER,
    FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GameRoom" ("createAt", "id", "name", "playerCount", "updateAt") SELECT "createAt", "id", "name", "playerCount", "updateAt" FROM "GameRoom";
DROP TABLE "GameRoom";
ALTER TABLE "new_GameRoom" RENAME TO "GameRoom";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
