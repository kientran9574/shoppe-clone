import z from 'zod'

export const priceSchema = z
  .object({
    price_min: z.string(),
    price_max: z.string()
  })
  .superRefine((data, ctx) => {
    const min = Number(data.price_min)
    const max = Number(data.price_max)

    const isMinFilled = data.price_min !== ''
    const isMaxFilled = data.price_max !== ''

    if (isMinFilled && isMaxFilled) {
      if (min > max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Giá không phù hợp',
          path: ['price_min']
        })
      }
    } else if (!isMinFilled && !isMaxFilled) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Bạn phải nhập ít nhất một giá',
        path: ['price_min']
      })
    }
  })
export type Schema = z.infer<typeof priceSchema>
