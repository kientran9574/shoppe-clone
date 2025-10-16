import type { AuthResponse } from '../types/auth.types'
import http from '../utils/http'

export const authApi = {
  login: (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body),
  register: (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)
}
