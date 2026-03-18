import express from 'express';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express();

// CORS must come BEFORE routes
app.use(
  cors({
    origin: "http://localhost:3001", 
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes come after middleware
app.use("/api/auth", authRouter);

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;