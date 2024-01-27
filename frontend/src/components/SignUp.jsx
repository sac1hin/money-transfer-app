import React, { useState } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api';
import { toast } from 'react-toastify';

function SignUp() {

    const signIn = useSignIn();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmitSignUp = async (event) => {
        console.log("Dd")
        event.preventDefault();
        try {
            const { token } = await signUp({ firstName, lastName, email, password });
            signIn({
                auth: {
                    token,
                    type: 'Bearer'
                }
            });
            navigate('/');
            toast.success('Sign UP successful!', {
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
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                                Create and account
                            </h1>
                            <form className="space-y-2 md:space-y-4" action="#">
                                <div>
                                    <label htmlFor="firstName" className="block mb-1 text-sm font-medium text-gray-900">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => { setFirstName(e.target.value) }}
                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 placeholder-gray-400 focus:border-blue-500"
                                        placeholder="john"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block mb-1 text-sm font-medium text-gray-900">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => { setLastName(e.target.value) }}
                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 placeholder-gray-400 focus:border-blue-500"
                                        placeholder="cena"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        placeholder="name@company.com"
                                        required=""
                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 placeholder-gray-400 focus:border-blue-500"
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
                                        className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 block w-full p-2.5 placeholder-gray-400 focus:border-blue-500"
                                        required=""
                                    />
                                </div>
                                <button
                                    onClick={(e) => { handleSubmitSignUp(e) }}
                                    type="submit"
                                    className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Create an account
                                </button>
                                <p className="text-sm font-medium text-black">
                                    Already have an account? <a href="/signin" className="font-medium text-black underline hover:text-gray-500">Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SignUp;