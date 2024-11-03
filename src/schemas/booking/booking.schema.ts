import { z } from "zod";

export const bookingSchema = z.object({
  booking_id: z.string().optional(),
  notes: z.string().optional(),
  status: z.string(),
});

export type BookingSchemaType = z.infer<typeof bookingSchema>;
