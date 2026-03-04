import { z } from 'zod';

const createStockInSchema =z.object({
  body:
  z.object({
     srNo: z.string({required_error:"sr no is required"}),
     bookingNo: z.string({required_error:"Booking no is required"}),
     bookingId: z.string({required_error:"Booking id no is required"}),
     potatoName: z.string({required_error:"Potato name is required"}),
     srHolderName: z.string({required_error:"SR holder name is required"}),
     receiverName: z.string({required_error:"Receiver name is required"}),
     bagsIn: z.number({required_error:"Bags In is required"}).positive("Quantity of bags must be greater than 0"),
     date: z.string({required_error:"Date is required"}),
   })
})


const updateStockInSchema = z.object({
  body:
  z.object({
     srNo: z.string().optional(),
     bookingNo: z.string().optional(),
     bookingId: z.string().optional(),
     bagsIn: z.number().positive("Quantity of bags must be greater than 0").optional(),
     date: z.string().optional(),
   })
})

export const stockInValidation = {
  createStockInSchema,
  updateStockInSchema,
};
