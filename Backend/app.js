import express from 'express';
import authRouter from './routes/auth.route.js';

const app = express();

app.use(express.json());
app.use("/api/auth",authRouter);


// test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;
