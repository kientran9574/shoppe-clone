import { useMutation } from '@tanstack/react-query'
import { authApi } from '../apis/auth'
import { useAppContext } from '../context/app.context'

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
const useLogoutMutation = () => {
  const { setAuthenticated } = useAppContext()
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => setAuthenticated(false)
  })
}
export { useRegisterMutation, useLoginMutation, useLogoutMutation }
