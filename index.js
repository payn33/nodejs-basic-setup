require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swaggerOutput.json");
const cors = require("cors");

var whitelist = ["http://localhost:3001/", "https://soft-pharma-api.herokuapp.com/"];
var corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

const itemsRoute = require("./routes/items");
const ordersRoute = require("./routes/orders");
const authRoute = require("./routes/auth");

//middleware
app.use(cors());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/items", itemsRoute);
app.use("/orders", ordersRoute);
app.use("/auth", authRoute);

const db_conect = async () => {
  try {
    await mongoose.connect(
      process.env.DB_CONNECTION,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        console.log("db connected");
      }
    );
  } catch (err) {
    console.log(err);
  }
};

db_conect();

app.listen(port, () => console.log(`port ${port}`));
