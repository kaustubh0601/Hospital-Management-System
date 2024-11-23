import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";

const app = express();
// config({ path: "./config.env" });
config({ path: "./config/.env" });


app.use(        // Conect frontend and backend
  cors({
    // origin: [process.env.FRONTEND_URL_ONE, process.env.FRONTEND_URL_TWO],
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());       // get cookies    // ALL 3 are middleware
app.use(express.json());       // get/ parse data in json format
app.use(express.urlencoded({ extended: true }));        // recognize the incoming string and date

app.use(                    // app.use  all are middleware
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);   
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

dbConnection();

app.use(errorMiddleware);     // used in last always
export default app;
