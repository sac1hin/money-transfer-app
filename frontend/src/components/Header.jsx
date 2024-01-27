// @flow 
import * as React from 'react';
import { toast } from 'react-toastify';
import { profile } from '../api';

export const Header = () => {
    const [user, setUser] = React.useState({});

    const fetchUser = async () => {
        try {
            const data = await profile();
            console.log("DDDDDDDDDDDdd", data)
            setUser(data.profile)
            setOpenPaymentPage(prev => !prev);
            // toast.success('Payment transfer', {
            //     position: 'top-right',
            // });
        } catch (e) {
            console.log(e);
            toast.error(e?.response?.data?.message, {
                position: 'top-right',
            });
        }
    }

    React.useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <header className="text-gray-600 body-font border-b-2 shadow-sm">
                <div className="container mx-auto flex flex-wrap justify-between p-5 md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <span className="ml-3 text-xl">Payment App</span>
                    </a>
                    {/* <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                        <a className="mr-5 hover:text-gray-900">First Link</a>
                        <a className="mr-5 hover:text-gray-900">Second Link</a>
                        <a className="mr-5 hover:text-gray-900">Third Link</a>
                        <a className="mr-5 hover:text-gray-900">Fourth Link</a>
                    </nav> */}
                    <div className='flex justify-end items-center'>
                        <div className='mr-2 text-center'>
                            Hello, {`${user.firstName} ${user.lastName}`}
                        </div>
                        <div className="inline-flex items-center cursor-pointer bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded-full text-base mt-4 md:mt-0">
                            {`${user?.firstName?.charAt(0)?.toUpperCase()}${user?.lastName?.charAt(0)?.toUpperCase()}`}
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};