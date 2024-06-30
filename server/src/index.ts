import express = require("express");
import router from "./routes";
import cors from "cors";
import cookieParse from "./middlewares/cookieParse";
import Server from "./utils/server";

const PORT = parseInt(process.env.SERVER_PORT!) || 4040;
const app = new Server();

app.use(cors())
app.use(express.json())
app.use(cookieParse())
app.use("/api", router)

app.listen(PORT, () => {
    console.log(`server is listenning on port ${PORT}`)
})