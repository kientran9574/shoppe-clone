import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '../../schemas/auth'
import Input from '../../components/input/Input'
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })
  const onSubmit = (values: LoginFormData) => {
    console.log('check')
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
