import express = require("express");
import dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.SERVER_PORT || 4040;
const app = express();

console.log(process.env.SERVER_PORT)

app.listen(PORT, () => {
    console.log(`server is listenning on port ${PORT}`)
})