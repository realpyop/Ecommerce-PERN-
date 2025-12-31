import express from "express"
import { ENV } from "./config/env"
import { clerkMiddleware } from "@clerk/express"

const app = express()

app.use(clerkMiddleware());

app.get("/", (req, res) => {
    res.json({
        message: "This is a PERN ECommerce App",
        endpoint: {
            users: "/api/users",
            products: "/api/products",
            comments: "/api/comments"
        }
    })
})

app.listen(ENV.PORT, () => console.log("Server is up and running on PORT", ENV.PORT))