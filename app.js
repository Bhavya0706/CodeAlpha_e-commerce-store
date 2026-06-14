const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const MongoStore = require("connect-mongo").default;
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");

const authrouter = require('./routes/authrouter');
const productrouter = require('./routes/productrouter');
const cartrouter = require('./routes/cartrouter');
const orderrouter = require('./routes/ordersrouter');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
    session({
        secret: "secretkey",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL
        })
    })
);


app.use(authrouter);
app.use(productrouter);
app.use(cartrouter);
app.use(orderrouter);



mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected")).then(()=>{
    app.listen(3000, () => {
        console.log(`http://localhost:3000`);
      });
}).catch(err => console.log(err));




