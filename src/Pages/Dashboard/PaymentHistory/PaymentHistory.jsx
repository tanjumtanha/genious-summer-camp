import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import Title from '../../../components/Title/Title';

const PaymentHistory = () => {
    const [paymentHistory, setPaymentHistory] = useState([]);
    const [axiosSecure] = useAxiosSecure();

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                const response = await axiosSecure.get('/payment-history');
                setPaymentHistory(response.data);
            } catch (error) {
                console.error('Error fetching payment history:', error);
            }
        };

        fetchPaymentHistory();
    }, [axiosSecure]);

    return (
        <div className="container mx-auto mt-4 p-8">
            <Helmet>Music School - Payment History</Helmet>
            <Title heading={'Payment History'}></Title>
            {paymentHistory.length > 0 ? (
                <table className="w-full bg-v border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b border-gray-200">Payment Date</th>
                            <th className="py-2 px-4 border-b border-gray-200">Amount</th>
                            <th className="py-2 px-4 border-b border-gray-200">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.map((payment) => (
                            <tr key={payment._id}>
                                <td className="py-2 text-center px-4 border-b border-gray-200">{payment.date}</td>
                                <td className="py-2 text-center px-4 border-b border-gray-200">{payment.price}</td>
                                <td className="py-2 px-4 text-center border-b border-gray-200">{payment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No payment history available.</p>
            )}
        </div>
    );
};

export default PaymentHistory;
