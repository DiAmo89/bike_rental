-- 1. Добавляем nullable
ALTER TABLE "bookings" ADD COLUMN "first_name" varchar(100);
ALTER TABLE "bookings" ADD COLUMN "last_name" varchar(100);
ALTER TABLE "bookings" ADD COLUMN "email" varchar(255);
ALTER TABLE "bookings" ADD COLUMN "phone" varchar(50);

-- 2. Заполняем
UPDATE "bookings" b
SET
  "first_name" = u.full_name,
  "last_name" = u.full_name,
  "email" = u.email,
  "phone" = COALESCE(u.phone, '')
FROM "users" u
WHERE b.user_id = u.id;

-- 3. Делаем NOT NULL
ALTER TABLE "bookings" ALTER COLUMN "first_name" SET NOT NULL;
ALTER TABLE "bookings" ALTER COLUMN "last_name" SET NOT NULL;
ALTER TABLE "bookings" ALTER COLUMN "email" SET NOT NULL;
ALTER TABLE "bookings" ALTER COLUMN "phone" SET NOT NULL;