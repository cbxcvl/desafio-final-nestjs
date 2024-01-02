/*
  Warnings:

  - You are about to alter the column `phone` on the `Customers` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `VarChar(11)`.
  - You are about to alter the column `cpf` on the `Customers` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `VarChar(11)`.
  - You are about to alter the column `phone` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `VarChar(11)`.
  - You are about to alter the column `cpf` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `VarChar(11)`.
  - Made the column `phone` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cpf` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customers" ALTER COLUMN "cep" SET DATA TYPE TEXT,
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(11),
ALTER COLUMN "cpf" SET DATA TYPE VARCHAR(11);

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(11),
ALTER COLUMN "cpf" SET NOT NULL,
ALTER COLUMN "cpf" SET DATA TYPE VARCHAR(11);
