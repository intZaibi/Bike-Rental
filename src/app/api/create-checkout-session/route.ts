import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { 
      amount, 
      bikeName, 
      startDate, 
      endDate, 
      days, 
      addOns, 
      deliveryOption,
      currency = 'usd' 
    } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Calculate individual amounts
    const basePrice = 0.5; // Base price per day
    const bikeRentalTotal = basePrice * days;
    const selectedAddOns = addOns?.filter((a: any) => a.selected) || [];
    const addOnsTotal = selectedAddOns.reduce((sum: number, a: any) => sum + a.price, 0);
    
    console.log('Stripe Checkout Calculation:', {
      totalFromApp: amount,
      bikeRentalTotal,
      deliveryOption,
      addOnsTotal,
      calculatedTotal: bikeRentalTotal + deliveryOption + addOnsTotal
    });
    
    // Create line items for Stripe Checkout
    const lineItems = [
      {
        price_data: {
          currency,
          product_data: {
            name: `${bikeName} Rental`,
            description: `Bike rental from ${startDate} to ${endDate} (${days} days)`,
          },
          unit_amount: Math.round(bikeRentalTotal * 100),
        },
        quantity: 1,
      }
    ];

    // Add delivery option if not free
    if (deliveryOption > 0) {
      lineItems.push({
        price_data: {
          currency,
          product_data: {
            name: 'Home Delivery',
            description: 'Bike delivery to your location',
          },
          unit_amount: Math.round(deliveryOption * 100),
        },
        quantity: 1,
      });
    }

    // Add selected add-ons
    selectedAddOns.forEach((addon: any) => {
      lineItems.push({
        price_data: {
          currency,
          product_data: {
            name: addon.name,
            description: `Add-on for ${bikeName} rental`,
          },
          unit_amount: Math.round(addon.price * 100),
        },
        quantity: 1,
      });
    });

    // Get the correct origin from the request
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host') || request.nextUrl.host;
    const baseUrl = `${protocol}://${host}`;
    
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: lineItems,
    //   mode: 'payment',
    //   success_url: `${baseUrl}/bike/bike-booking?success=true&session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${baseUrl}/bike/bike-booking?canceled=true`,
    //   billing_address_collection: 'required',
    //   shipping_address_collection: {
    //     allowed_countries: ['US'],
    //   },
    //   payment_intent_data: {
    //     metadata: {
    //       bikeName,
    //       startDate,
    //       endDate,
    //       days: days.toString(),
    //       type: 'bike_rental',
    //     },
    //   },
    //   metadata: {
    //     bikeName,
    //     startDate,
    //     endDate,
    //     days: days.toString(),
    //     type: 'bike_rental',
    //   },
    // });

    return NextResponse.json({
      sessionId: "session.id",
      url: "session.url",
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
