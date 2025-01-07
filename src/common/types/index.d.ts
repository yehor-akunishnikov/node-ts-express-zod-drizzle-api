import {Request, Query} from "express";

import {User} from "@user-feature";

export interface AuthRequest<
	P = core.ParamsDictionary,
	ResBody = unknown,
	ReqBody = unknown,
	ReqQuery = Query,
	Locals extends Record<string, unknown> = Record<string, unknown>,
> extends Request<
	P,
	ResBody,
	ReqBody,
	ReqQuery,
	Locals
> {
	user: User;
}
