import { NextRequest, NextResponse } from 'next/server';
import { stripe, formatAmountForStripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'usd', metadata = {} } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: formatAmountForStripe(amount),
    //   currency,
    //   metadata,
    //   automatic_payment_methods: {
    //     enabled: true,
    //   },
    // });

    return NextResponse.json({
      clientSecret: "" 
      // paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
