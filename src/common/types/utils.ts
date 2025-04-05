import {Request, Response, NextFunction, Handler} from "express";
import {z as zod, ZodObject, ZodRawShape} from "zod";

import {UserSession} from "@common/types/context";

export type StrictZodObject = ZodObject<ZodRawShape, "strict">;

export enum LQRequestMethod {
  ALL = "all",
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
  OPTIONS = "options",
  HEAD = "head"
}

export interface LQSchemaDefinition<
  Q extends StrictZodObject = StrictZodObject,
  B extends StrictZodObject = StrictZodObject,
  P extends StrictZodObject = StrictZodObject,
  H extends StrictZodObject = StrictZodObject,
> {
  query: Q;
  body: B;
  params: P;
  headers: H;
}

export type LQHandlerFn<
  S extends LQSchemaDefinition,
  Protected extends boolean | undefined
> = (
  req: Omit<Request, "query" | "body" | "params" | "headers"> & {
    query: Parameters<Handler>[0]["query"] & {parsingResult: zod.SafeParseReturnType<unknown, zod.output<S["query"]>>};
    body: {parsingResult: zod.SafeParseReturnType<unknown, zod.output<S["body"]>>};
    params: Parameters<Handler>[0]["params"] & {parsingResult: zod.SafeParseReturnType<unknown, zod.output<S["params"]>>};
    headers: Parameters<Handler>[0]["headers"] & {parsingResult: zod.SafeParseReturnType<unknown, zod.output<S["headers"]>>};
    hasErrors: boolean;
    userSession: Protected extends true ? UserSession : undefined
  },
  res: Response,
  next: NextFunction
) => ReturnType<Handler>;

export interface LQSuccess<T> {
  data: T;
  error: null;
  success: true;
}

export interface LQFailure<E> {
  data: null;
  error: E;
  success: false;
}

export type LQResult<E = Error, T = null> = LQSuccess<T> | LQFailure<E>;
