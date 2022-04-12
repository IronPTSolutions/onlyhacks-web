import React, { useState, useEffect } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { payment, getUserDetail } from '../../../services/UsersService';
import './CheckoutForm.css'
import { useParams } from 'react-router-dom';

const StripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [user, setUser] = useState();
  const { userId } = useParams()

  useEffect(() => {
    getUserDetail(userId)
      .then(user => setUser(user))
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {

    } else if (paymentMethod) {
      const { id } = paymentMethod
      payment({ amount: 100, id: id })
      .then(result =>  console.log(result))
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement/>
      <button type="submit" disabled={!stripe || !elements}>
        Subscribe!
      </button>
    </form>
  );
};

const stripePromise = loadStripe('pk_test_zcTEmEh9DNzx17DvNLibaUVS');

const CheckoutForm = () => (
  <div className="d-flex text-center align-items-center flex-column justify-content-center">
    <Elements stripe={stripePromise}>
      <StripeForm />
    </Elements>
  </div>

);

export default CheckoutForm