import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routes/ProductRouter.js';
import userRouter from './routes/UserRouter.js';
import path from 'path';
import orderRouter from './routes/OrderRouter.js';
import uploadRouter from './routes/uploadRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/ajistore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.get('/', (req, res) => {
    res.send('Server is ready')
});

app.use((err, req, res, next) => {
    res.status(500).send({messege: err.message});
});

const port = process.env.PORT || 5000

app.listen(port, () =>{
    console.log(`Serve at http://localhost:${port}`);
});