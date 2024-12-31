const express = require('express')
const colors = require('colors')
const cors = require('cors')

const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDb = require('./config/db')



dotenv.config();

connectDb();

const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/test",require("./routes/testRoutes"));
app.use("/api/v1/auth",require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));

app.get('/',(req,res)=>{
    return res.status(200).send("<h1> welcome to food server By srijan</h1>");
});

//port
const PORT = process.env.PORT || 5000;
//listen wo work the given command
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`.white.bgMagenta);
});
