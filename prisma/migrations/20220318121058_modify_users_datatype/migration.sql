-- AlterTable
ALTER TABLE `users` ADD COLUMN `uadated_at` DATETIME(3) NULL,
    MODIFY `phone_number` VARCHAR(191) NULL;
