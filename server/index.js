import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv'
import connect from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"

dotenv.config({ path: '.env' })
const app = express();

// middlewares 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const corsOptions = {
    origin: 'http//localhost:5173',
    credential: true,
}
app.use(cors(corsOptions));

const port = 3000;

// app.get("/home", (req,res)=> {
//     return res.status(200).json({
//         message: "I am coming from backend",
//         success: true
//     })
// });

// apis
app.use('/api/v1/user',userRoute)
app.use('/api/v1/company', companyRoute);
connect();
app.listen(port , () => {
    console.log(`Server running at port &{port}`);
} )