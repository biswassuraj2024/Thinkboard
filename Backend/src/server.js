import express from 'express';
import dotenv from "dotenv"
import cors from 'cors'
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import path from 'path';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001
const __dirname = path.resolve();

//middleware
app.use(express.json())
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
  origin:"http://localhost:5173"
}))}

/*app.use((req,res,next)=>{
  console.log("We just got a request")
  next();
})*/

app.use("/api/notes",notesRoutes)

if (process.env.NODE_ENV === 'production') {app.use(express.static(path.join(__dirname, "../frontend/thinkboard/dist")));

app.get("*", (req, res) => {res.sendFile(path.join(__dirname, "../frontend/thinkboard/dist/index.html"));})}
connectDB().then(()=>{
app.listen(PORT, () => {
  console.log('Server is running on port ',PORT);
})
});

