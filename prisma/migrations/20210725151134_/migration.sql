-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "acronym" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Type" ("acronym", "createAt", "description", "id", "name", "updateAt") SELECT "acronym", "createAt", "description", "id", "name", "updateAt" FROM "Type";
DROP TABLE "Type";
ALTER TABLE "new_Type" RENAME TO "Type";
CREATE UNIQUE INDEX "Type.name_unique" ON "Type"("name");
CREATE UNIQUE INDEX "Type.acronym_unique" ON "Type"("acronym");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
