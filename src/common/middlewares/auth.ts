import {StatusCodes} from "http-status-codes";
import {Handler, Request} from "express";
import jwt from "jsonwebtoken";

import {UserSession} from "@common/types/context";

export const authMiddleware: Handler = (
  req: Request & {userSession?: UserSession},
  res,
  next
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (token) {
    jwt.verify(
      token,
      process.env.AUTH_SECRET!,
      (err, user) => {
        if (err) {
          res.status(StatusCodes.FORBIDDEN).json({message: "Access forbidden"});
        } else {
          req.userSession = user as UserSession;
          next();
        }
      }
    );
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({message: "Unauthorized"});
  }
};
