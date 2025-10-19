import type { AxiosError } from 'axios'
import axios from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.enum'
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
export const removeAccessTokenLS = () => {
  localStorage.removeItem('accessToken')
}
