/*
  Warnings:

  - Added the required column `categoryId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("id", "name", "quantity") SELECT "id", "name", "quantity" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
