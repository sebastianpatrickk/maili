ALTER TABLE "emails" ADD COLUMN "publicId" text NOT NULL;--> statement-breakpoint
CREATE INDEX "Email_publicId_idx" ON "emails" USING btree ("publicId");