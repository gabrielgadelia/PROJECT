import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import historyroutes from "./routes/historyroutes.js"

const app = express()
const port = 5000
const mongo_url = "mongodb+srv://gabrielgadelia69:12344321@historycluster.we9xulv.mongodb.net/?retryWrites=true&w=majority&appName=historycluster"

// midlewears
app.use(express.json())
app.use(cors())
app.use("/history", historyroutes)

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
    mongoose.connect(mongo_url)
    .then(() => console.log("connected to the DB"))
    .catch((err) => console.log(err))
})