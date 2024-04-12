import { app } from "./app.js";
import dotenv from "dotenv";
import { connect } from "./db/index.js";

dotenv.config({
  path: "./.env",
});
connect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server running on localhost:${process.env.PORT}`);
  });
});
