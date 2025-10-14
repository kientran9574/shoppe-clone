import { z } from 'zod'
// register
export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Vui lòng nhập email')
      .email('Email không hợp lệ')
      .max(100, 'Email không được vượt quá 100 ký tự')
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email phải có định dạng example@domain.com'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirm_password: z.string().min(1, 'Vui lòng xác nhận mật khẩu')
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Mật khẩu không khớp',
        path: ['confirm_password']
      })
    }
  })

export type RegisterFormData = z.infer<typeof registerSchema>
// login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Vui lòng nhập email')
    .email('Email không hợp lệ')
    .max(100, 'Email không được vượt quá 100 ký tự')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email phải có định dạng example@domain.com'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
})
export type LoginFormData = z.infer<typeof loginSchema>
