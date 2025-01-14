import "dotenv/config";

import {StatusCodes} from "http-status-codes";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import passport from "passport";
import express from "express";
import helmet from "helmet";

import {handleGlobalError} from "@common/middlewares";
import {configurePassport} from "@config/passport";
import {HttpError} from "@common/errors";

import {characterRouter} from "@character-feature";
import {userRouter} from "@user-feature";
import {authRouter} from "@auth-feature";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false // Disable the `X-RateLimit-*` headers.
}));
configurePassport(passport);

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/characters", characterRouter);
app.use((_, res, next) => {
  next(new HttpError(StatusCodes.NOT_FOUND, "Error: Resource not found"));
});

app.use(handleGlobalError);

(() => {
  try {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
