import express = require("express");
import router from "./routes";
import cors, { CorsOptions } from "cors";
import cookieParse from "./middlewares/cookieParse";
import Server from "./utils/server";
import path = require("path");

const PORT = parseInt(process.env.SERVER_PORT!) || 4040;
const app = new Server();

const whitelist = ['http://localhost:5173', 'http://frontend:5173']

var corsOptions:CorsOptions = {
  origin: function (origin, callback) {
    if (!origin ||whitelist.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error('CORS: Not allowed by CORS'))
  },
  credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParse())

app.use("/api", router)
app.use("/cdn", express.static(path.join(__dirname, 'uploads')))

app.listen(PORT, () => {
    console.log(`server is listenning on port ${PORT}`)
})