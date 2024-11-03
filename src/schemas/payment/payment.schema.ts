import { z } from "zod";

export const paymentSchema = z.object({
  booking_id: z.string().optional(),
  payment_method: z.string(),
  status: z.string(),
});

export type PaymentSchemaType = z.infer<typeof paymentSchema>;
