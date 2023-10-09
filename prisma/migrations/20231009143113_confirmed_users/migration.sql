-- CreateTable
CREATE TABLE "ConfirmedUser" (
    "_id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "travelId" STRING NOT NULL,

    CONSTRAINT "ConfirmedUser_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "ConfirmedUser" ADD CONSTRAINT "ConfirmedUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfirmedUser" ADD CONSTRAINT "ConfirmedUser_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "Travel"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
