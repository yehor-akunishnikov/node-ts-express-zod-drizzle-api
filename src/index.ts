import "dotenv/config";

import {StatusCodes} from "http-status-codes";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import passport from "passport";
import express from "express";
import helmet from "helmet";

import {handleGlobalError} from "@common/middlewares/error";
import {HttpError} from "@common/errors";

import {authRouter} from "@auth/router";
import {userRouter} from "@user/router";

const app = express();
const port = process.env.PORT ?? 3000;

/* Lib middlewares */
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false // Disable the `X-RateLimit-*` headers.
}));

/* Routes */
app.use("/auth", authRouter);
app.use("/users", userRouter);

/* Custom middlewares */
app.use((_, res, next) => {
  next(new HttpError(StatusCodes.NOT_FOUND, "Error: Resource not found"));
});
app.use(handleGlobalError);

(() => {
  try {
    app.listen(port, () => {
      console.log("Open app at: http://localhost:3000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
