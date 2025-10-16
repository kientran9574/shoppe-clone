import { useMutation } from '@tanstack/react-query'
import { authApi } from '../apis/auth'

const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authApi.register
  })
}
const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApi.login
  })
}
export { useRegisterMutation, useLoginMutation }
