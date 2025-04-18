import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cookieParser from "cookie-parser"
import homepageRoutes from "./routes/homepage.routes.js"
import adminRoutes from "./routes/admin.routes.js";
import facultyRoutes from "./routes/faculty.routes.js";
import nonfacultyRoutes from "./routes/nonfaculty.routes.js";
import eventRoutes from "./routes/event.routes.js";
import memberRoutes from "./routes/member.routes.js";
import auditRoutes from "./routes/audit.routes.js";
import aluminiRoutes from "./routes/alumini.routes.js";
import academicsRoutes from "./routes/academics.routes.js"
import studentRoutes from "./routes/student.routes.js";
import resultRoutes from "./routes/result.routes.js";
import analysisRoutes from "./routes/anlyatics.routes.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//module imports for real-time updates

import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app); // 'createServer(app):'Converts Express app into an HTTP server.Required because Socket.io needs an HTTP server to work.
const io = new Server(server, {
    cors: { origin: process.env.CORS_ORIGIN, credentials: true },
});


//configs
dotenv.config({
    path: "./.env",
})
app.use(
    cors({ origin: process.env.CORS_ORIGIN, credentials: true, })
);
//parsing form-data ,json ,urlencodeded ...
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));
app.use(cookieParser()); // middleware to parse cookies


//hompage routes 
app.use("/api/homepage", homepageRoutes);
//admin routes
app.use("/api/admin", adminRoutes);
//Faculty route 
app.use("/api/faculty", facultyRoutes);
//NonFacultu routes
app.use("/api/nonfaculty", nonfacultyRoutes)
//Events routes
app.use("/api/events", eventRoutes)
//member routes
app.use("/api/member", memberRoutes)
//audit routes
app.use("/api/audit", auditRoutes)
//alumni routes
app.use("/api/alumini", aluminiRoutes)
//academics routes
app.use("/api/academics", academicsRoutes)
//student placed
app.use("/api/placed-student", studentRoutes)
//result placed
app.use("/api/result", resultRoutes)
//Analytics placed
app.use("/api/analysis",analysisRoutes )

// Serve static files from React build
app.use(express.static(path.join(__dirname, "../../Frontend/dist")));
app.get("*", (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) return next();

  res.sendFile(path.join(__dirname, "../../Frontend/dist/index.html"));
});

// WebSocket Logic 
let connectionCount = 0; // Counter for total connections
io.on("connection", (socket) => {
    connectionCount++;
    console.log(`Client connected via WebSocket. Connection count: ${connectionCount}`);

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});
// Attach `io` to `app` so it can be accessed in controllers
app.set("io", io);
connectDB()
    .then(() => {
        server.listen(process.env.PORT || 9000, () => {
            console.log(`Server is running at Port: ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection Failed!!! ", err);
    });