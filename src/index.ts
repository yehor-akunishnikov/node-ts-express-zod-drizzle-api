import "dotenv/config";

import {StatusCodes} from "http-status-codes";
import bodyParser from "body-parser";
import passport from "passport";
import express from "express";

import {handleGlobalError} from "@common/middlewares";
import {configurePassport} from "@config/passport";
import {HttpError} from "@common/errors";
import {userRouter} from "@user-feature";
import {authRouter} from "@auth-feature";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json());
app.use(passport.initialize());
configurePassport(passport);

app.use("/auth", authRouter);
app.use("/users", userRouter);
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
