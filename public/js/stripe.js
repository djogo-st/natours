/*eslint-disable*/
import axios from 'axios';
import { Stripe } from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import { showAlert } from './alert';

const publicKey = 'pk_test_51Ihh05Kg5EqRXnEWWyRuK0wQH7imXHZbuocLMU2MQVOAQQysJ5MF3HVhfaI5Me3BSRdhFptFpYeTrI6T8spxCwD900xUifEPcv';
const stripe = Stripe(publicKey);

export const bookTour = async tourId => {
  try {
    //  1)  Get checkout session from API
    const session = await axios(`/api/v1/booking/checkout-session/${tourId}`);
    // console.log(session);

//  2)  Create checkout form + charge credite card
    const stripe = await loadStripe(publicKey);
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });

  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};