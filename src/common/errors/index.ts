import {StatusCodes} from "http-status-codes";

export class HttpError extends Error {
  constructor(
    public readonly status: StatusCodes,
    public readonly message: string
  ) {
    super(message);
  }
}
