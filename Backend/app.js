import express from 'express';
import eventRoutes from './routes/eventRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/events', eventRoutes);

export default app;
