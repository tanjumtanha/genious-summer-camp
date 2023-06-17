import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import useCart from '../../../hooks/useCart';
import { Helmet } from 'react-helmet-async';
import Title from '../../../components/Title/Title';

const Pay = () => {
    const location = useLocation();
    const [price, setPrice] = useState('');
    const [cart] = useCart();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const price = searchParams.get('price');
        setPrice(parseFloat(price).toFixed(2)); // Convert to float and fix to two decimal points
    }, [location.search]);
    console.log(price)

    return (
        <div className="w-full">
            <Helmet>Music School - Payment</Helmet>
            <Title heading={'Payment'}></Title>
            {price && (
                <Elements stripe={loadStripe(import.meta.env.VITE_Payment_Gateway_PK)}>
                    <CheckoutForm cart={cart} price={price}></CheckoutForm>
                </Elements>
            )}
        </div>
    );
};

export default Pay;
