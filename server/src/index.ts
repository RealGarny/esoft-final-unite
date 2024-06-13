import express = require("express");
import dotenv = require('dotenv');
import router from "./routes";
import cors from "cors";
dotenv.config();

const PORT = process.env.SERVER_PORT || 4040;
const app = express();

app.use(cors())
app.use(express.json())
app.use("/api", router)

app.listen(PORT, () => {
    console.log(`server is listenning on port ${PORT}`)
})