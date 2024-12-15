const express = require("express");
const connectDB = require('./database/connectDB');

// Routes
const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");
const readerRoutes = require("./routes/readers");

const app = express();

// middlewares
app.use(express.json());

// connecting database ( MongoDB )
connectDB('mongodb://localhost:27017/Library');

app.use("/users",userRoutes);
app.use("/books",bookRoutes);
app.use('/reader',readerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=>{
    console.log(`Server is running on PORT : ${PORT}`);
});