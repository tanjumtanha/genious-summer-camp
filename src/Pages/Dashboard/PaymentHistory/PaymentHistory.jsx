import React from 'react';
import { Helmet } from 'react-helmet-async';
import Title from '../../../components/Title/Title';

const PaymentHistory = () => {
    return (
        <div>
            <Helmet>
                <title>Music School - Payment</title>
            </Helmet>
            <Title heading={'Payment History'}></Title>
        </div>
    );
};

export default PaymentHistory;