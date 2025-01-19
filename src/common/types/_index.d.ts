import {Query, Request} from "express";

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

declare global {
  namespace PrismaJson {
    type CharacterPassiveSkills = Record<number, number>;

    interface CharacterBaseStats {
      strength: number;
      dexterity: number;
      intellect: number;
      perception: number;
      charisma: number;
    }

    interface CharacterHealthPoints {
      total: number;
      current: number;
    }
  }
}
