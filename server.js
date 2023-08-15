import { app } from "./app.js";
import { connectDB } from "./database/database.js"

connectDB();

app.listen(process.env.port, () => {
  console.log(
    `Server is working on port:${process.env.port} in ${process.env.NODE_ENV} Mode`
  );
});