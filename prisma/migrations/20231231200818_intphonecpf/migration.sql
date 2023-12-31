/*
  Warnings:

  - The `phone` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cpf` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `phone` on the `Customers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cpf` on the `Customers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Customers" DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER NOT NULL,
DROP COLUMN "cpf",
ADD COLUMN     "cpf" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER,
DROP COLUMN "cpf",
ADD COLUMN     "cpf" INTEGER;
