CREATE TABLE "emails" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL,
	"inboxId" integer NOT NULL,
	"response" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inboxes" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "emails" ADD CONSTRAINT "emails_inboxId_inboxes_id_fk" FOREIGN KEY ("inboxId") REFERENCES "public"."inboxes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "Email_name_idx" ON "emails" USING btree ("title");