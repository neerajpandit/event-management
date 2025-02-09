

/* In This file i handle All Middleware 
    All Api Routes ETC */



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import helmet from "helmet";
import sanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config({ path: "../.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "*",
        credentials: true,
    })
);

app.use(express.json({ limit: process.env.EXPRESS_JSON_LIMIT }));
app.use(sanitize());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(xss());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(
    session({
        secret: process.env.ACCESS_TOKEN_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

// Morgan Logging
const logDirectory = path.join(__dirname, "logs");
if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);
const accessLogStream = fs.createWriteStream(path.join(logDirectory, "access.log"), { flags: "a" });
if (process.env.NODE_ENV === "production") {
    app.use(morgan("combined", { stream: accessLogStream }));
} else {
    app.use(morgan("dev"));
}

// Static files
app.use("/image", express.static(path.join(__dirname, "..", "public/uploads")));

// Routing
import userRouter from "./routes/user.routes.js";
import eventRouter from "./routes/event.routes.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/event", eventRouter);

// Base route
app.get("/", (req, res) => {
    res.redirect("/api/v1/");
});

// API version endpoint
app.get("/api/v1/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Node.js server!" });
});

// Error handling for payload too large
app.use((err, req, res, next) => {
    if (err.type === "entity.too.large") {
        res.status(413).json({
            message: "Payload Too Large. The request size exceeds the limit.",
        });
    } else {
        next(err);
    }
});

// Catch-all 404 handler
app.use("*", (req, res) => {
    res.status(404).send("<h1>404! Page not found</h1>");
});

export { app };
