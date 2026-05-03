import 'dotenv/config';
import { createApp } from './app';

if (!process.env.PORT) {
  console.warn('PORT environment variable is not set, using default port 3001');
}
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const PORT = process.env.PORT || 3001;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check endpoint: http://localhost:${PORT}/api/health`);
});
