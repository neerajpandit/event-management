

/* IN this File I Handle Server 
   SSL Sertificate (for https)
   and Socket Connectin 
 */


import { app } from "./app.js";
import connectDB from "./database/dbConnection.js";
import http from "http";
import https from "https";
import { Server as SocketServer } from "socket.io";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name from the module URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create HTTP server
const httpServer = http.createServer(app);

// Initialize Socket.IO with CORS settings
const io = new SocketServer(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || "*", // Allow frontend connection
        methods: ["GET", "POST"]
    }
});

// Handle socket connections
io.on("connection", (socket) => {
    console.log(`New Socket Connected: ${socket.id}`);

    socket.on("message", (data) => {
        console.log(`Message from ${socket.id}:`, data);
        io.emit("message", data); // Broadcast message to all clients
    });

    socket.on("disconnect", () => {
        console.log(`Socket Disconnected: ${socket.id}`);
    });
});

const isSSL = process.env.IS_SSL;

if (isSSL === "true") {
    // Load SSL certificate and key
    const privateKey = fs.readFileSync(process.env.SSL_SERVER_KEY, "utf8");
    const certificate = fs.readFileSync(process.env.SSL_SERVER_CERT, "utf8");
    const credentials = { key: privateKey, cert: certificate };

    // Create HTTPS server
    const httpsServer = https.createServer(credentials, app);

    // Attach Socket.IO to HTTPS server
    const ioHttps = new SocketServer(httpsServer, {
        cors: {
            origin: process.env.CLIENT_URL || "*",
            methods: ["GET", "POST"]
        }
    });

    ioHttps.on("connection", (socket) => {
        console.log(`New Secure Socket Connected: ${socket.id}`);

        socket.on("message", (data) => {
            console.log(` Secure Message from ${socket.id}:`, data);
            ioHttps.emit("message", data);
        });

        socket.on("disconnect", () => {
            console.log(`Secure Socket Disconnected: ${socket.id}`);
        });
    });

    connectDB()
        .then(() => {
            // Try to start the HTTPS server
            httpsServer.listen(process.env.httpsPORT || 8000, () => {
                console.log(` HTTPS Server is running at port: ${process.env.httpsPORT}`);
            });

            httpsServer.on("error", (err) => {
                console.error(" HTTPS Server failed to start:", err.message);
                console.log(" Switching to HTTP Server...");

                // Start HTTP server as a fallback
                httpServer.listen(process.env.httpPORT || 8000, () => {
                    console.log(`⚙️ HTTP Server is running at port: ${process.env.httpPORT}`);
                });
            });
        })
        .catch((err) => {
            console.log("MONGO DB connection failed !!!", err);
        });
} else {
    connectDB()
        .then(() => {
            // Start HTTP server
            httpServer.listen(process.env.httpPORT || 8000, () => {
                console.log(`⚙️ HTTP Server is running at port: ${process.env.httpPORT}`);
            });
        })
        .catch((err) => {
            console.log("MONGO DB connection failed !!!", err);
        });
}

export { io }; // Export socket for global access
