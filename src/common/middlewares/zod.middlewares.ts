import {StatusCodes} from "http-status-codes";
import {Handler, Request} from "express";
import {Schema, ZodError} from "zod";

import {HttpError} from "@common/errors";

export const applyRequestDto = (
  schema: Schema,
  key: keyof Pick<Request, "body" | "query" | "params">
): Handler => {
  return (req, res, next) => {
    try {
      req[key] = schema.parse(req[key]);
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        next(new HttpError(StatusCodes.BAD_REQUEST, e.errors[0].message));
      }

      next();
    }
  };
};
