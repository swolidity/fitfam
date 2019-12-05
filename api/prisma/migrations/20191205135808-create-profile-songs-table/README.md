# Migration `20191205135808-create-profile-songs-table`

This migration has been generated by Andy Kay at 12/5/2019, 1:58:08 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `fitfam`.`ProfileSong` (
  `artist` varchar(191) NOT NULL DEFAULT '' ,
  `createdAt` datetime(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  `id` varchar(191) NOT NULL  ,
  `provider` varchar(191) NOT NULL DEFAULT '' ,
  `thumbnail` varchar(191) NOT NULL DEFAULT '' ,
  `title` varchar(191) NOT NULL DEFAULT '' ,
  `updatedAt` datetime(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  `url` varchar(191) NOT NULL DEFAULT '' ,
  `user` varchar(191) NOT NULL ,
 FOREIGN KEY (`user`) REFERENCES `fitfam`.`User`(`id`) ON DELETE RESTRICT,
  PRIMARY KEY (`id`)
)
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE UNIQUE INDEX `ProfileSong.id` ON `fitfam`.`ProfileSong`(`id`)
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20191204101254-add-bio..20191205135808-create-profile-songs-table
--- datamodel.dml
+++ datamodel.dml
@@ -1,25 +1,26 @@
 datasource db {
   provider = "mysql"
-  url = "***"
+  url      = env("MYSQL_URL")
 }
 generator photon {
   provider      = "photonjs"
   binaryTargets = ["rhel-openssl-1.0.x", "native"]
 }
 model User {
-  id          String       @default(cuid()) @id @unique
-  email       String       @unique
-  name        String
-  username    String       @unique
-  picture     String
-  bio         String
-  workouts    Workout[]
-  bodyweights Bodyweight[]
-  createdAt   DateTime     @default(now())
-  updatedAt   DateTime     @updatedAt
+  id            String        @default(cuid()) @id @unique
+  email         String        @unique
+  name          String
+  username      String        @unique
+  picture       String
+  bio           String
+  workouts      Workout[]
+  bodyweights   Bodyweight[]
+  profile_songs ProfileSong[]
+  createdAt     DateTime      @default(now())
+  updatedAt     DateTime      @updatedAt
 }
 model Workout {
   id        String       @default(cuid()) @id @unique
@@ -51,5 +52,17 @@
   weight    Float
   user      User
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
+}
+
+model ProfileSong {
+  id        String   @default(cuid()) @id @unique
+  user      User
+  thumbnail String
+  url       String
+  title     String
+  artist    String
+  provider  String
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
 }
```

## Photon Usage

You can use a specific Photon built for this migration (20191205135808-create-profile-songs-table)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191205135808-create-profile-songs-table'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```