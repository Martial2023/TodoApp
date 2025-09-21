import express from 'express'
import dotenv from 'dotenv'
import todoRoutes from './routes/todo.route.js'
import { connectDB } from './config/db.js';
import path from 'path'
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(express.json());

// API routes first
app.use('/api/todos', todoRoutes)

const __dirname = path.resolve();
if(process.env.NODE_ENV === 'production'){
    // Serve static files from React build
    app.use(express.static(path.join(__dirname, 'frontend/dist')));
    
    // Catch all handler for React Router - avoid Express 5 route issues
    app.use((req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
})
