import {Handler, Router} from "express";
import {z as zod} from "zod";

import {authMiddleware} from "@common/middlewares/auth";
import {
  StrictZodObject,
  LQRequestMethod,
  LQSchemaDefinition,
  LQHandlerFn
} from "@common/types/utils";

export class LQController<
  Protected extends boolean | undefined,
  Q extends StrictZodObject = StrictZodObject,
  B extends StrictZodObject = StrictZodObject,
  P extends StrictZodObject = StrictZodObject,
  H extends StrictZodObject = StrictZodObject
> {
  public readonly schemaDefinition: LQSchemaDefinition<Q, B, P, H>;
  public readonly method: LQRequestMethod;
  public readonly isProtected: Protected | undefined;

  private get _decoratedHandlerFn(): LQHandlerFn<LQSchemaDefinition<Q, B, P, H>, Protected> {
    return (...args) => {
      const req = args[0];

      req.query.parsingResult = this.schemaDefinition.query.safeParse(req.query);
      req.body.parsingResult = this.schemaDefinition.body.safeParse(req.body);
      req.params.parsingResult = this.schemaDefinition.params.safeParse(req.params);
      req.headers.parsingResult = this.schemaDefinition.headers.safeParse(req.headers);

      req.hasErrors = !(
        req.query.parsingResult.success &&
        req.body.parsingResult.success &&
        req.params.parsingResult.success &&
        req.headers.parsingResult.success
      );

      return this._originalHandlerFn(...args);
    };
  }

  constructor(
    config: {
      validators?: Partial<LQSchemaDefinition<Q, B, P, H>>,
      isProtected?: Protected,
      method: LQRequestMethod
    },
    private readonly _originalHandlerFn: LQHandlerFn<LQSchemaDefinition<Q, B, P, H>, Protected>
  ) {
    this.schemaDefinition = {
      body: (config.validators?.body ?? zod.object({})) as B,
      query: (config.validators?.query ?? zod.object({})) as Q,
      params: (config.validators?.params ?? zod.object({})) as P,
      headers: (config.validators?.headers ?? zod.object({})) as H
    };
    this.isProtected = config.isProtected;
    this.method = config.method;
  }

  public attachToRouter(
    router: Router,
    path: string,
    middlewaresBefore: Handler[] = [],
    middlewaresAfter: Handler[] = []
  ): void {
    if (this.isProtected) {
      middlewaresBefore = [authMiddleware, ...middlewaresBefore];
    }

    router[this.method](
      path,
      ...middlewaresBefore,
      this._decoratedHandlerFn as unknown as Handler,
      ...middlewaresAfter
    );
  }
}
