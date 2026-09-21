import Input from '../components/Input'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'

type RegisterFormValues = {
    name: string
    email: string
    password: string
}


function Register() {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>()

    function onSubmit(data: RegisterFormValues) {
        localStorage.setItem('user', JSON.stringify(data))
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8"
            >

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 mb-4">
                        <span className="text-2xl font-bold text-white">
                            M
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        Create your account
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Get started with MyApp
                    </p>
                </div>

                <div className="space-y-4">
                    <Input
                        id="register-name"
                        label="Full Name"
                        type="text"
                        placeholder="Enter your name"
                        {...register('name', {
                            required: 'This field is required',
                        })}
                        error={errors.name?.message}
                    />

                    <Input
                        id="register-email"
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        {...register('email', {
                            required: 'This field is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Enter a valid email',
                            },
                        })}
                        error={errors.email?.message}
                    />

                    <Input
                        id="register-password"
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register('password', {
                            required: 'This field is required',
                            minLength: {
                                value: 8,
                                message: 'At least 8 characters',
                            },
                        })}
                        error={errors.password?.message}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
                >
                    Create Account
                </button>

                <p className="mt-6 text-center text-sm text-slate-400">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-blue-400 hover:text-blue-300 font-semibold"
                    >
                        Log in
                    </Link>
                </p>

            </form>
        </div>
    )
}

export default Register