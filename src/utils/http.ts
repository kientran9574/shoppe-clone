import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import toast from 'react-hot-toast'
import type { AuthResponse } from '../types/auth.types'
import { getAccessTokenLS, removeToLS, setAccessTokenToLS, setProfileToLS } from './utils'
import { useAppContext } from '../context/app.context'
import type { User } from '../types/user.types'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    //Localstorage nó lưu trong ổ cứng,
    // Mình lưu accessToken trong Class thì nó sẽ lưu trong RAM và mình Đọc dữ liệu trong RAM nhanh hơn ổ cứng
    this.accessToken = getAccessTokenLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        const { url } = response.config
        if (url === '/login' || url === '/register') {
          const data = response.data as AuthResponse
          this.accessToken = (response.data as AuthResponse).data?.access_token || ''
          setAccessTokenToLS(this.accessToken)
          setProfileToLS(data.data?.user as User)
        } else if (url === '/logout') {
          this.accessToken = ''
          removeToLS()
        }
        return response
      },
      function onRejected(error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any = error.response?.data
          const message = data?.message || error.message
          toast.error(message || 'Server Error')
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance

export default http
