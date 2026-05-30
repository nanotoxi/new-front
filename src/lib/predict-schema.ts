import { z } from "zod";

export const predictSchema = z.object({
  nanoparticle: z.string().min(1, "Required"),

  size: z.coerce
    .number()
    .positive("Must be positive"),

  shape: z.string().min(1, "Required"),

  coating: z.string().optional(),

  concentration: z.coerce
    .number()
    .positive(),

  exposureTime: z.coerce
    .number()
    .positive(),

  cellType: z.string().min(1),

  surfaceCharge: z.string().min(1),

  temperature: z.coerce
    .number()
    .positive(),

  ph: z.coerce
    .number()
    .min(0)
    .max(14),
});

export type PredictInput = z.infer<typeof predictSchema>;