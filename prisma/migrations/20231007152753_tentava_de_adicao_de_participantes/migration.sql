-- CreateTable
CREATE TABLE "Participants" (
    "_id" STRING NOT NULL,

    CONSTRAINT "Participants_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "_PendingUsers" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "_ConfirmedUsers" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PendingUsers_AB_unique" ON "_PendingUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_PendingUsers_B_index" ON "_PendingUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ConfirmedUsers_AB_unique" ON "_ConfirmedUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_ConfirmedUsers_B_index" ON "_ConfirmedUsers"("B");

-- AddForeignKey
ALTER TABLE "_PendingUsers" ADD CONSTRAINT "_PendingUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Participants"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PendingUsers" ADD CONSTRAINT "_PendingUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConfirmedUsers" ADD CONSTRAINT "_ConfirmedUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Participants"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConfirmedUsers" ADD CONSTRAINT "_ConfirmedUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Travel"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
