import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"


export const users = pgTable(
    "users", 
    {
        id: text("id").primaryKey(),    // ClerkID
        email: text("email").notNull().unique(),
        name: text("name"),
        imageUrl: text("image_url"),
        createAt: timestamp("create_at", { mode: "date" }).notNull().defaultNow(),
        updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
    },
)

export const products = pgTable(
    "products",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        title: text("title").notNull(),
        description: text("description").notNull(),
        imageUrl: text("image_url").notNull(),
        userId: text("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade"}),    // If owner of product is delete, the products also delete
        createAt: timestamp("create_at", { mode: "date" }).notNull().defaultNow(),
        updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
    }
)

export const comments = pgTable(
    "comments",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        content: text("content").notNull(),
        userId: text("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade"}),
        productsId: uuid("product_id")
            .notNull()
            .references(() => products.id, { onDelete: "cascade" }),
        createAt: timestamp("create_at", { mode: "date" }).notNull().defaultNow(),
        updatedAt:timestamp("updated_at", { mode: "date" }).notNull().defaultNow()
    }
)

// # Relation define how tables connect to each other. This enables Drizzle's query API
//   to automatically join related data when using `with: {relationName: true}`

// User Relations: A user can have many products and many comments
//                 `many()` means one user can have multiple related records
export const usersRelations = relations(users, ({ many }) => ({
    products: many(products),
    comments: many(comments)
}));

// Product Relations: A product can have many comments and one user
//                   `one()` means one product can have one related records
export const productsRelations = relations(products, ({ one, many }) => ({
    comments: many(comments),
    // `field` = the foreign key column in THIS table
    // `references` = the primary key column in the RELATED table
    user: one(users, { fields: [products.userId], references: [users.id] }),
}));

// Comment Relations: A comment belong to one product and one user
export const commentsRelations = relations(comments, ({ one }) => ({
    users: one(users, { fields: [comments.userId], references: [users.id] }), 
    products: one(products, { fields: [comments.userId], references: [products.id] })
}))

// Type inference -> exporting object types so other files can use 
export type User = typeof users.$inferSelect;
export type newUser = typeof users.$inferInsert;

export type Product = typeof products.$inferSelect;
export type newProduct = typeof products.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type newComment = typeof comments.$inferInsert;