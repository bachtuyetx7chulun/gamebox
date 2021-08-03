-- CreateTable
CREATE TABLE "User" (
    "email" TEXT,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "picture" TEXT,
    "bio" TEXT,
    "refreshToken" TEXT,
    "password" TEXT,
    "facebookId" TEXT,
    "googleId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "activeLink" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "typeId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    FOREIGN KEY ("typeId") REFERENCES "Type" ("name") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("roleId") REFERENCES "Role" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "acronym" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "engine" TEXT,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "GameUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "userId" INTEGER,
    "gameRoomId" INTEGER,
    "gameId" INTEGER,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("gameRoomId") REFERENCES "GameRoom" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GameRoom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "playerCount" INTEGER,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Type.name_unique" ON "Type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Type.acronym_unique" ON "Type"("acronym");

-- CreateIndex
CREATE UNIQUE INDEX "Role.name_unique" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Game.name_unique" ON "Game"("name");
