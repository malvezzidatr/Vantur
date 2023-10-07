-- CreateTable
CREATE TABLE "User" (
    "_id" STRING NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" STRING NOT NULL,
    "last_name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "isAdmin" BOOL NOT NULL DEFAULT false,
    "salt" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Travel" (
    "_id" STRING NOT NULL,
    "value" STRING NOT NULL,
    "departure_location" STRING NOT NULL,
    "destination" STRING NOT NULL,
    "seats" INT4 NOT NULL,
    "ownerId" STRING,

    CONSTRAINT "Travel_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
