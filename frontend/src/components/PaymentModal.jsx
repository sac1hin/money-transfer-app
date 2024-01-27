import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { initiateTransfer } from '../api';

function PaymentModal({ toBeSend, setOpenPaymentPage }) {
    const [amount, setAmount] = useState(0);

    const handleInitiateTransfer = async () => {
        try {
            await initiateTransfer({ ...toBeSend, amount });
            setOpenPaymentPage(prev => !prev);
            toast.success('Payment transfer', {
                position: 'top-right',
            });
        } catch (e) {
            console.log(e);
            toast.error(e?.response?.data?.message, {
                position: 'top-right',
            });
        }
    }

    return (
        <div className='h-96 w-  flex flex-col justify-between absolute top-1/4 left-1/3 p-10'>
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow p-4">
                <div className="mb-2">
                    <h1 className='text-2xl font-extrabold mt-2 text-center mb-8'>Send Money</h1>

                    <div className='flex justify-start items-center'>
                        <div className="text-white text-lg font-semibold h-10 w-10 inline-flex justify-center items-center cursor-pointer bg-green-400 border-0 py-1 px-2 focus:outline-none hover:bg-gray-200 rounded-full mt-4 md:mt-0">
                            {`S`}
                        </div>
                        <h5 className="ml-4 mb-1 text-xl font-medium text-gray-900">{toBeSend.name}</h5>
                    </div>
                    <span className='font-semibold text-xs'>Amount (in RS)</span>
                </div>
                <input
                    type="number"
                    name="amount"
                    id="amount"
                    value={amount}
                    onChange={(e) => { setAmount(Number(e.target.value)) }}
                    className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-md block w-full p-2.5 placeholder-gray-400"
                    placeholder="Enter amount"
                    required=""
                />
                <button
                    onClick={handleInitiateTransfer}
                    className="w-full mt-4 bg-green-500 text-white hover:bg-green-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
                >
                    Initiate Transfer
                </button>
            </div>

        </div>
    );
}

export default PaymentModal;