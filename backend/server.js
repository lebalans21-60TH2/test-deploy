const app = require("./app");
const connectDatabase = require("./db/Database");
const cloudinary = require('cloudinary')

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

// config
const path = require('path');
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: path.resolve(__dirname, './config/.env'),
  });
}

// connect db
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


// create server
// const PORT = process.env.PORT || 8000;
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running 1 on http://localhost:${process.env.PORT}`
  );
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});