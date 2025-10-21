import type { AxiosError } from 'axios'
import axios from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import type { User } from '../types/user.types'
// đây là cú pháp sẽ giúp, sau khi chay function thi sẽ chuyen cai error thanh 1 cai type nhat dinh
export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  return axios.isAxiosError(error)
}

export const isAxiosUnprocessableEntityError = <FormError>(error: unknown): error is AxiosError<FormError> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const setAccessTokenToLS = (accessToken: string) => {
  console.log(accessToken)
  localStorage.setItem('accessToken', accessToken)
}
export const getAccessTokenLS = () => {
  return localStorage.getItem('accessToken') || ''
}

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
export const getProfileToLS = () => {
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile) : null
}

export const removeToLS = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('profile')
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('de-DE').format(value)
}
export function formatNumberToSocial(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}
