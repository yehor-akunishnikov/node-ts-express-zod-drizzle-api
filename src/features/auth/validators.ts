import {z as zod} from "zod";

import {passwordRegexp} from "@common/regexp";

export const registerValidators = {
  body: zod.strictObject({
    name: zod.string().min(2).nonempty(),
    email: zod.string().email().nonempty(),
    password: zod.string().nonempty().refine(
      (value) => passwordRegexp.test(value ?? ""),
      "Password is too weak"
    )
  })
};

export const loginValidators = {
  body: zod.strictObject({
    email: zod.string().email().nonempty(),
    password: zod.string().nonempty()
  })
};
