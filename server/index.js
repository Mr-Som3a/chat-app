import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv"
import dataBase from "./config/db.config.js"
import path from "path"
import authRouter from "./routes/auth.route.js"
import messageRouter from "./routes/message.route.js"
import usersRouter from "./routes/users.route.js"
import { fileURLToPath } from "url"


// CONFIGRATION
const app = express()
configDotenv()
const port = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//  MIDDELWARES
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:8080', 
  credentials: true               // If you are using cookies or headers
}));
app.use("/assets",express.static(path.join(__dirname,'public/assets')))

//  ROUTES
app.use("/api/auth",authRouter) 
app.use("/api/message",messageRouter)
app.use("/api/users",usersRouter)


// PORT LESTENING
app.listen(port,()=>{
    console.log('server listening on port '+port)
    //  DATA BASE CONNECTION
    dataBase()
})