import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";

import {HttpError} from "@common/errors";

export const handleGlobalError = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!err) {
		next();
	}

	if (err instanceof HttpError) {
		res.status(err.status).json({error: err.message});
	} else {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Failed to handle request"});
	}
};
