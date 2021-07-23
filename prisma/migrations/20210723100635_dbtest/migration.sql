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
    "active" BOOLEAN NOT NULL DEFAULT true,
    "premium" BOOLEAN NOT NULL DEFAULT false,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "typeId" TEXT NOT NULL,
    FOREIGN KEY ("typeId") REFERENCES "Type" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "acronym" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Type.name_unique" ON "Type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Type.acronym_unique" ON "Type"("acronym");
