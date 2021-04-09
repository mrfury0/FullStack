if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");

const app = express();

const expressLayouts = require("express-ejs-layouts");

const bodyParser = require("body-parser");
const index = require("./routes/index.js");

const authorRoutes = require("./routes/authors.js");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      connectTimeoutMS: 10000,
      poolSize: 10,
      writeConcern: {
        j: true,
      },
    });
    console.log("MongoDB Connected..");
  } catch (err) {
    console.error(err.message);

    // Exit Process with Faliure
    process.exit(1);
  }
};

app.set("view engine", "ejs");

app.set("views", __dirname + "/views");

app.set("layout", "layouts/layouts");

app.use(expressLayouts);

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

const mongoose = require("mongoose");

connectDB();

app.use("/", index);
app.use("/authors", authorRoutes);

app.listen(process.env.PORT || 3000);
