import React, { useEffect, useMemo, useState } from 'react';
import { Header } from './Header';
import { filterUser, handleBalance } from '../api';
import { toast } from 'react-toastify';
import PaymentModal from './PaymentModal';

function Dashboard() {
    const [balance, setBalance] = useState(0);
    const [userSearch, setUserSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [openPaymentPage, setOpenPaymentPage] = useState(false);
    const [toBeSend, setToBeSend] = useState({});

    const fetchBalance = async () => {
        try {
            const { balance } = await handleBalance();
            setBalance(balance);
        } catch (e) {
            console.log(e);
            toast.error(e?.response?.data?.message, {
                position: 'top-right',
            });
        }
    }

    const fetchAllUser = async () => {
        try {
            console.log("Dassa")
            const { users } = await filterUser(userSearch);
            setUsers(users);
        } catch (e) {
            toast.error(e?.response?.data?.message, {
                position: 'top-right',
            });
        }
    }

    const handleSendMoney = async (to, name) => {
        setToBeSend({ to, name });
        setOpenPaymentPage(prev => !prev);
    }
    useEffect(() => {
        fetchBalance();
    }, [openPaymentPage]);

    useEffect(() => {
        fetchAllUser();
    }, [userSearch]);

    useEffect(() => {
        fetchBalance();
    }, []);

    return (
        <>
            <Header />
            <div className='p-6'>
                <h1 className='text-xl font-bold'>{`Your Balance ₹${balance}`}</h1>
                <div className='py-4'>
                    <h1 className='text-xl font-bold mb-4'>Users</h1>

                    <div className="relative">
                        <input type="search" value={userSearch} onChange={(e) => { setUserSearch(e.target.value) }} id="default-search" className="block w-full p-2 text-sm border border-gray-300 rounded-lg dark:placeholder-gray-400" placeholder="Search Mockups, Logos..." required />
                    </div>

                    <div>
                        {
                            users.length > 0 ?
                                users.map((u, index) => {
                                    const { firstName, lastName, _id } = u;
                                    const name = `${firstName} ${lastName}`
                                    return (
                                        <div key={index} className='py-5 flex justify-between items-center'>
                                            <div className='flex justify-between items-center'>
                                                <div className="inline-flex items-center cursor-pointer bg-gray-100 border-0 py-1 px-2 focus:outline-none hover:bg-gray-200 rounded-full text-base mt-4 md:mt-0">
                                                    {`${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`}
                                                </div>
                                                <div className='ml-4'>
                                                    {name}
                                                </div>
                                            </div>
                                            <button onClick={() => { handleSendMoney(_id, name) }} className='text-sm p-2 bg-black text-white rounded-md'>
                                                Send Money
                                            </button>
                                        </div>
                                    )
                                })
                                :
                                <h1 className='text-xl font-bold mt-4'>No User</h1>
                        }
                    </div>

                </div>
            </div>
            {openPaymentPage && <PaymentModal setOpenPaymentPage={setOpenPaymentPage} toBeSend={toBeSend} />}
        </>
    );
}

export default Dashboard;