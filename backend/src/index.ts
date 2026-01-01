import express from "express"
import cors from "cors"; 
import { ENV } from "./config/env"
import { clerkMiddleware } from "@clerk/express"

const app = express()

app.use(cors({ origin: ENV.FRONTEND_URL })); //Bypass API blocking API call from localhost
app.use(clerkMiddleware()); // Auth obj will be attached to the req
app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parses form data (like HTML forms)

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