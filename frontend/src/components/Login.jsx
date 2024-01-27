import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { login } from '../api';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from 'react-router-dom';

function Login() {
    
    const signIn = useSignIn();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        try {
            const { token } = await login({ email, password });
            signIn({
                auth: {
                    token,
                    type: 'Bearer'
                }
            });
            navigate('/');
            toast.success('Login successful!', {
                position: 'top-right',
            });

        } catch (e) {
            console.log(e);
            toast.error(e.response.data.message, {
                position: 'top-right',
            });
        }
    }

    return (
        <div className='w-full flex justify-center items-center'>
            <section className="bg-white">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-gray-800">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                                Sign In
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={(e) => handleSubmitLogin(e)}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        placeholder="••••••••"
                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                                        required=""
                                    />
                                </div>
                                <div className="flex items-center justify-end">
                                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline">Forgot password?</a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Sign in
                                </button>
                                <p className="text-sm font-medium text-black">
                                    Don’t have an account yet? <a href="/signup" className="font-medium text-black underline hover:text-gray-500">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
