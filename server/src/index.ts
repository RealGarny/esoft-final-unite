import express = require("express");
import router from "./routes";
import cors from "cors";

const PORT = parseInt(process.env.SERVER_PORT!) || 4040;
const app = express();

app.use(cors())
app.use(express.json())
app.use("/api", router)

app.listen(PORT, () => {
    console.log(`server is listenning on port ${PORT}`)
    console.log("test4")
})