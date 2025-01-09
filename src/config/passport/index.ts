import {ExtractJwt, Strategy, StrategyOptionsWithoutRequest} from "passport-jwt";
import {PassportStatic} from "passport";

import {userService} from "@user-feature";

const opts: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!
};

export const configurePassport = (passport: PassportStatic) => {
  passport.use(
    new Strategy(opts, async (payload: {id: number}, done): Promise<void> => {
      try {
        const user = await userService.findOne({id: payload.id});

        if (user) {
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    })
  );
};
