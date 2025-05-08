import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config.js";
import userRouter from "./routes/userRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

app.listen(3001, () => {
  console.log("სერვერი დაისტარტა 3001 პორტზე");
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => console.log("ბაზასთან (mongodb) კავშირი წარმატებულია"))
    .catch((err) =>
      console.error("MongoDB-სთან დაკავშირება ვერ მოხერხდა:", err)
    );
});
