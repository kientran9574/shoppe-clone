import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '../../schemas/auth'
import Input from '../../components/input/Input'
import { useLoginMutation } from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import type { ResponseApi } from '../../types/utils.type'
export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })
  const loginMutation = useLoginMutation()
  console.log('🚀 ~ Login ~ loginMutation:', loginMutation)
  const onSubmit = async (values: LoginFormData) => {
    console.log('🚀 ~ onSubmit ~ values:', values)
    if (loginMutation.isPending) return
    try {
      const res = await loginMutation.mutateAsync(values)
      console.log('🚀 ~ onSubmit ~ res:', res)
      if (res.data) {
        toast.success('Login Successfully')
      }
    } catch (error) {
      // Đây là cách handle bài toán thực tế nếu như có 1 cái FORM có nhiều trường ô input thì mình không thể if nhiều trong code được
      if (error && isAxiosUnprocessableEntityError<ResponseApi<any>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as any, {
              message: key as any,
              type: 'Server'
            })
          })
          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'Server'
          //   })
          // }
          // if (formError?.password) {
          //   setError('password', {
          //     message: formError.password,
          //     type: 'Server'
          //   })
          // }
        }
      }
    }
  }
  return (
    <div className={`bg-orange`}>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1  lg:grid-cols-5  lg:pr-12 py-12 lg:py-32 gri'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow' onSubmit={handleSubmit(onSubmit)}>
              <h2 className='font-bold text-black text-2xl'>Login</h2>
              <div className='mt-7'>
                <label htmlFor='email' className='text-base mb-2'>
                  Email:
                </label>
                <Input
                  // type='email'
                  id='email'
                  name='email'
                  placeholder='Email'
                  register={register}
                  className='p-2 bg-white w-full rounded text-black outline-none border focus:border-orange  transition-all'
                  errorsMessage={errors.email?.message}
                ></Input>
                {/* <input type='email' id='email' {...register('email')} className=''></input>
                <div className='text-red-500 mt-1 text-sm'>{errors.email?.message}</div> */}
              </div>
              <div className='mt-6'>
                <label className='text-base mb-2' htmlFor='password'>
                  Password:
                </label>
                <Input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Password'
                  register={register}
                  className='p-2 bg-white w-full rounded text-black outline-none border focus:border-orange  transition-all'
                  errorsMessage={errors.password?.message}
                ></Input>
                {/* <input
                  type='password'
                  id='password'
                  {...register('password')}
                  className='p-2 bg-white w-full rounded text-black outline-none border focus:border-orange  transition-all '
                ></input>
                <div className='text-red-500 mt-2'>{errors.password?.message}</div> */}
              </div>
              <button
                type='submit'
                className='w-full py-4 mt-4 rounded border bg-orange font-bold active:bg-opacity-70 transition-all text-white'
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
