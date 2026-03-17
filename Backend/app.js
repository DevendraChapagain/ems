import express from 'express';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);


// test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;
