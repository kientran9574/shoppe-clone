import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import toast from 'react-hot-toast'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // Add a response interceptor
    axios.interceptors.response.use(
      function onFulfilled(response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
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
