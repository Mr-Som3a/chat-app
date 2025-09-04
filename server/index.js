import { configDotenv } from "dotenv"
import express from "express"
import cors from "cors"
import dataBase from "./config/db.config.js"
import path from "path"
import authRouter from "./routes/auth.route.js"
import messageRouter from "./routes/message.route.js"
import usersRouter from "./routes/users.route.js"
import { fileURLToPath } from "url"
import { app,server } from "./config/socket.js"




// CONFIGRATION
configDotenv()
const port = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


//  MIDDELWARES
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'..','client','dist')))
  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:8080', 
  credentials: true               // If you are using cookies or headers
}));
app.use(express.urlencoded({ extended: true }));

//  ROUTES
app.use("/api/auth",authRouter) 
app.use("/api/message",messageRouter)
app.use("/api/users",usersRouter)

// PORT LESTENING
server.listen(port,()=>{
    console.log('server listening on port '+ port)
    //  DATA BASE CONNECTION
    dataBase()
    
})