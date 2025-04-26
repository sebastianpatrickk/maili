import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  timestamp,
  index,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

export const emails = pgTable(
  "emails",
  {
    id: serial("id").primaryKey(),
    publicId: text("publicId")
      .notNull()
      .$defaultFn(() => nanoid()),
    title: text("title").notNull(),
    email: text("email").notNull(),
    message: text("message").notNull(),
    inboxId: integer("inboxId")
      .references(() => inboxes.id)
      .notNull(),
    response: text("response"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => [
    index("Email_name_idx").on(table.title),
    index("Email_publicId_idx").on(table.publicId),
  ]
);

export const emailsRelations = relations(emails, ({ one }) => ({
  inbox: one(inboxes, {
    fields: [emails.inboxId],
    references: [inboxes.id],
    relationName: "inbox",
  }),
}));

export const emailSelectSchema = createSelectSchema(emails);
export const emailInsertSchema = createInsertSchema(emails);

export const inboxes = pgTable("inboxes", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const inboxesRelations = relations(inboxes, ({ many }) => ({
  emails: many(emails, { relationName: "inbox" }),
}));
