import {RefinementCtx, z} from "zod";

export const toNumber = (customMessage?: string) => {
	return (
		value: string,
		ctx: RefinementCtx
	): number => {
		const parsed = Number(value);

		if (isNaN(parsed)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: customMessage ?? "Not a number",
			});

			return z.NEVER;
		}

		return parsed;
	};
};
