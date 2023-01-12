import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import moment from 'moment';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const booking = useLoaderData();
   
    const { name, price, bookingDate, location } = booking;
    return (
        <div>
            <h3 className="text-3xl">Payment for {name}</h3>
            <p className="text-xl">Please pay <strong>${price}</strong> for your appointment on {moment(bookingDate).utc().format("YYYY-MM-DD")} at {location}</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;