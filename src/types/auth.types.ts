import type { User } from './user.types'
import type { ResponseApi } from './utils.type'

export type AuthResponse = ResponseApi<{
  access_token: string
  expires: string
  user: User
}>
