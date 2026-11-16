import express from "express";
import config from "./config/config.service.js";
import { connectDB } from "./database/connection.js";
import { errorHandler } from "./common/index.js";
import { authRouter, userRouter } from "./module/index.js";

const app = express();
const PORT = config.PORT;

await connectDB();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
