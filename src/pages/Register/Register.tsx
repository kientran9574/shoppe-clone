import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormData } from '../../schemas/auth'
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })
  const onSubmit = (values: RegisterFormData) => {
    console.log('check')
  }
  return (
    <div className={`bg-orange`}>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1  lg:grid-cols-5  lg:pr-12 py-12 lg:py-32'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow' onSubmit={handleSubmit(onSubmit)}>
              <h2 className='font-bold text-black text-2xl'>Register</h2>
              <div className='mt-7'>
                <label htmlFor='email' className='text-base mb-2'>
                  Email:
                </label>
                <input
                  type='email'
                  id='email'
                  {...register('email')}
                  className='p-2 bg-white w-full rounded text-black outline-none border focus:border-orange  transition-all'
                ></input>
                <div className='text-red-500 mt-1 text-sm'>{errors.email?.message}</div>
              </div>
              <div className='mt-6'>
                <label className='text-base mb-2' htmlFor='password'>
                  Password:
                </label>
                <input
                  type='password'
                  id='password'
                  {...register('password')}
                  className='p-2 bg-white w-full rounded text-black outline-none border focus:border-orange  transition-all '
                ></input>
                <div className='text-red-500 mt-2'>{errors.password?.message}</div>
              </div>
              <div className='mt-6'>
                <label className='text-base mb-2' htmlFor='confirm_password'>
                  Confirm Password:
                </label>
                <input
                  type='password'
                  id='confirm_password'
                  {...register('confirm_password')}
                  className='p-2 bg-white w-full rounded text-black outline-none border focus:border-orange  transition-all '
                ></input>
                <div className='text-red-500 mt-2'>{errors.confirm_password?.message}</div>
              </div>
              <button
                type='submit'
                className='w-full py-4 mt-4 rounded border bg-orange font-bold active:bg-opacity-70 transition-all text-white'
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
