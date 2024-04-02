import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Express configuration
app.use(express.json({ limt: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());
// Express configuration

// Routes Import
import userRouter from "./routes/user.routes.js";
import agentRouter from "./routes/agent.routes.js";
import propertyRouter from "./routes/property.routes.js";
// Routes Import

// Routes Declarations
app.use("/api/users", userRouter);
app.use("/api/agents", agentRouter);
app.use("/api/properties", propertyRouter);
// Routes Declarations

export { app };
