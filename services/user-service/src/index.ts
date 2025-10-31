  // src/index.ts
  import express from 'express';
  import dotenv from 'dotenv';
  import userRoutes from './routes/userRoutes';
  dotenv.config();

  const app = express();
  const port = Number(process.env.PORT) || 5002;  // type conversion here
  app.use(express.json());
  app.use('/api', userRoutes);
  app.get('/', (req, res) => {
    res.send('Hello from TypeScript Backend!');
  });

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });