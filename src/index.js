import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dayjs from 'dayjs';
import poolRoutes from './routes/pool.routes.js';
import choiceRoutes from './routes/choice.routes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(poolRoutes);
app.use(choiceRoutes);

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
//   ;
// });
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});