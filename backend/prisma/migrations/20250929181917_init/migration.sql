-- CreateEnum
CREATE TYPE "public"."Sentiment" AS ENUM ('positive', 'neutral', 'negative');

-- CreateTable
CREATE TABLE "public"."Course" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "school" TEXT NOT NULL DEFAULT 'TUNI',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalVotes" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "teaching" DOUBLE PRECISION DEFAULT 0,
    "difficulty" DOUBLE PRECISION DEFAULT 0,
    "workload" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "public"."Rating" (
    "id" TEXT NOT NULL,
    "courseCode" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "teaching" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "difficulty" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "workload" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Comment" (
    "id" TEXT NOT NULL,
    "courseCode" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sentiment" "public"."Sentiment" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_key" ON "public"."Course"("code");

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "public"."Course"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "public"."Course"("code") ON DELETE CASCADE ON UPDATE CASCADE;
