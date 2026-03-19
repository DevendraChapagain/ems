import express from 'express';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express();

// Correct CORS setup
const allowedOrigins = [
  "http://localhost:3000",                               // local dev
  "https://ems.chapagaindevendra.com.np",                 // your deployed frontend
];

app.use(
  cors({
    origin: function(origin, callback) {
      // Allow requests with no origin (like Postman)
      if(!origin) return callback(null, true);

      if(allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy: The origin ${origin} is not allowed`;
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
    credentials: true,  // required for cookies/auth
  })
);

app.options("*", cors());  // Handle preflight requests

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;