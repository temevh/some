-- CreateTable
CREATE TABLE "Course" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "school" TEXT NOT NULL DEFAULT 'TUNI',
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalVotes" INTEGER NOT NULL DEFAULT 0,
    "rating" REAL DEFAULT 0,
    "teaching" REAL DEFAULT 0,
    "difficulty" REAL DEFAULT 0,
    "workload" REAL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "courseCode" TEXT NOT NULL,
    "rating" REAL NOT NULL DEFAULT 0,
    "teaching" REAL NOT NULL DEFAULT 0,
    "difficulty" REAL NOT NULL DEFAULT 0,
    "workload" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Rating_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Course" ("code") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "courseCode" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sentiment" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Comment_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Course" ("code") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_key" ON "Course"("code");
