import {z as zod} from "zod";

import {registerValidators, loginValidators} from "./validators";

export type RegisterPayload = zod.infer<typeof registerValidators.body>;
export type LoginPayload = zod.infer<typeof loginValidators.body>;
