import z from 'zod'

export const searchSchema = z.object({
  name: z
    .string({
      message: 'Tên sản phẩm là bắt buộc'
    })
    .trim()
})
export type SearchSchema = z.infer<typeof searchSchema>
