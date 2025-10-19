import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormData } from '../../schemas/auth'
import Input from '../../components/input/Input'
import { useRegisterMutation } from '../../hooks/useAuth'
import { omit } from 'lodash'
import toast from 'react-hot-toast'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import type { ErrorResponse } from '../../types/utils.type'
import { useAppContext } from '../../context/app.context'
import Button from '../../components/Button'
export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })
  const { setAuthenticated } = useAppContext()
  const registerMutation = useRegisterMutation()
  const onSubmit = async (values: RegisterFormData) => {
    if (registerMutation.isPending) return
    try {
      const data = omit(values, ['confirm_password'])
      const res = await registerMutation.mutateAsync(data)
      if (res.data) {
        if (res.data) {
          setAuthenticated(true)
        }
        toast.success('Register successfully')
      }
    } catch (error) {
      console.log(error)

      if (error && isAxiosUnprocessableEntityError<ErrorResponse<any>>(error)) {
        console.log(error)
        const formError = error.response?.data.data
        console.log('🚀 ~ onSubmit ~ formError:', formError)
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as any, {
              message: formError[key as keyof typeof formError],
              type: 'Server'
            })
          })
        }
      }
    }
  }
  return (
    <div className={`bg-orange`}>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1  lg:grid-cols-5  lg:pr-12 py-12 lg:py-32'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow' onSubmit={handleSubmit(onSubmit)}>
              <h2 className='font-bold text-black text-2xl'>Register</h2>
              <div className='mt-7'>
                <label htmlFor='email' className={`text-base mb-2 ${errors.email ? 'text-red-500' : 'text-black'}`}>
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
              </div>
              <div className='mt-6'>
                <label
                  className={`text-base mb-2 ${errors.password ? 'text-red-500' : 'text-black'}`}
                  htmlFor='password'
                >
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
              </div>
              <div className='mt-6'>
                <label
                  className={`text-base mb-2  ${errors.confirm_password ? 'text-red-500' : 'text-black'}`}
                  htmlFor='confirm_password'
                >
                  Confirm Password:
                </label>
                <Input
                  type='password'
                  id='confirm_password'
                  name='confirm_password'
                  placeholder='Confirm Password'
                  register={register}
                  className='p-2 bg-white w-full rounded text-black outline-none border focus:border-orange  transition-all'
                  errorsMessage={errors.confirm_password?.message}
                ></Input>
              </div>
              <Button
                isloading={registerMutation.isPending}
                disabled={registerMutation.isPending}
                type='submit'
                className='flex items-center justify-center text-white w-full py-4 mt-4 rounded border active:bg-opacity-70 bg-orange font-bold transition-all'
              >
                Register
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
