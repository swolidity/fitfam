# Migration `20200109103100-make-dob-optional`

This migration has been generated by Andy Kay at 1/9/2020, 10:31:00 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `fitfam`.`User` DROP COLUMN `dateOfBirth`,
ADD COLUMN `dateOfBirth` datetime(3)   ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200103001253-dateof-birth-and-height..20200109103100-make-dob-optional
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "mysql"
-  url = "***"
+  url      = env("MYSQL_URL")
 }
 generator photon {
   provider      = "photonjs"
@@ -18,9 +18,9 @@
   workouts      Workout[]
   bodyweights   Bodyweight[]
   profile_songs ProfileSong[]
   instagram     String?
-  dateOfBirth   DateTime
+  dateOfBirth   DateTime?
   height        String?
   createdAt     DateTime      @default(now())
   updatedAt     DateTime      @updatedAt
 }
```

