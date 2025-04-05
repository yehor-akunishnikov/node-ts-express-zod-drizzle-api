import {StatusCodes} from "http-status-codes";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {resSuccess, resFailure} from "@common/utils/helpers";
import {LQResult} from "@common/types/utils";
import {HttpError} from "@common/errors";
import * as userRepo from "@user/repo";

import {RegisterPayload, LoginPayload} from "./types";

export const register = async (
  payload: RegisterPayload
): Promise<LQResult<HttpError>> => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const {success, error} = await userRepo.create({
    ...payload,
    password: hashedPassword
  });

  if (success) {
    return resSuccess(null);
  }

  if (error?.constraint?.includes("unique")) {
    return resFailure(new HttpError(StatusCodes.CONFLICT, "User already exists"));
  }

  return resFailure(new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to process request"));
};

export const login = async (
  payload: LoginPayload
): Promise<LQResult<HttpError, string>> => {
  const {data: user, error: searchError} = await userRepo.findOneByEmail(payload.email);

  if (user) {
    if (await bcrypt.compare(payload.password, user.password)) {
      const token = jwt.sign(
        {email: user.email, id: user.id},
        process.env.AUTH_SECRET!,
        {expiresIn: "1h"}
      );

      return resSuccess(token);
    }

    return resFailure(new HttpError(StatusCodes.UNAUTHORIZED, "Invalid credentials"));
  }

  if (searchError) {
    return resFailure(new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to process request"));
  }

  return resFailure(new HttpError(StatusCodes.UNAUTHORIZED, "Invalid credentials"));
};
