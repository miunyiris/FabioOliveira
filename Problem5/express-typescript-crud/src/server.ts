import express from 'express';
import resourceRoutes from './routes/resourceRoutes';

const app = express();

app.use(express.json());
app.use('/resources', resourceRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});