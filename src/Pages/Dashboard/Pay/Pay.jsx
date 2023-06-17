import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
//import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../hooks/useCart";
import { Helmet } from 'react-helmet-async';
import Title from '../../../components/Title/Title';

// TODO: provide publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const [cart] = useCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2))
    return (
        <div className='w-full'>
            <Helmet>Music School - Payment</Helmet>
            <Title heading={'Payment'}></Title>
            <Elements stripe={stripePromise}>
                {/* <CheckoutForm cart={cart} price={price}></CheckoutForm> */}
            </Elements>
        </div>
    );
};

export default Payment;