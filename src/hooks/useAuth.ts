import { useMutation } from '@tanstack/react-query'
import { authApi } from '../apis/auth'
import type { RegisterFormData } from '../schemas/auth'

const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (body: { email: string; password: string }) => authApi.register(body)
  })
}
const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApi.login
  })
}
export { useRegisterMutation, useLoginMutation }
