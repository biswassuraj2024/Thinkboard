import express from 'express';
import dotenv from "dotenv"
import cors from 'cors'
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001


//middleware
app.use(express.json())
app.use(cors({
  origin:"http://localhost:5173"
}))
/*app.use((req,res,next)=>{
  console.log("We just got a request")
  next();
})*/

app.use("/api/notes",notesRoutes)
connectDB().then(()=>{
app.listen(PORT, () => {
  console.log('Server is running on port ',PORT);
})
});

