import express from 'express'
import dotenv from 'dotenv'
import todoRoutes from './routes/todo.route.js'
import { connectDB } from './config/db.js';
import path from 'path'
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(express.json());

const __dirname = path.resolve();
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.use('/api/todos', todoRoutes)

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
})
