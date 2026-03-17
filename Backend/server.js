import app from './app.js';
import connectDB from './config/database.js';
import config from './config/config.js';

connectDB(config.MONGO_URL);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});