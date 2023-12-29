/*
  Warnings:

  - The primary key for the `Billings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Customers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Billings" DROP CONSTRAINT "Billings_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Billings" DROP CONSTRAINT "Billings_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "Customers" DROP CONSTRAINT "Customers_supplierId_fkey";

-- AlterTable
ALTER TABLE "Billings" DROP CONSTRAINT "Billings_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "customerId" SET DATA TYPE TEXT,
ALTER COLUMN "supplierId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Billings_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Billings_id_seq";

-- AlterTable
ALTER TABLE "Customers" DROP CONSTRAINT "Customers_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "supplierId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Customers_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Customers_id_seq";

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Users_id_seq";

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billings" ADD CONSTRAINT "Billings_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billings" ADD CONSTRAINT "Billings_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
