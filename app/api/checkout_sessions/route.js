import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const formatAmountForStripe = (amount, currency) => {
    return Math.round(amount * 100)
   }

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

export async function POST(req) {
  try {
        // Create the `params` object with the required details for setting up a Stripe checkout session:
        // Set the `mode` to 'subscription' to handle recurring payments.
        // Specify card as the payment method.
        // Define a single line item representing the Pro subscription, priced at $10 per month.
        // Provide success and cancel URLs to redirect users after the payment process.
        // Use `stripe.checkout.sessions.create(params)` to generate the checkout session.
        // Return the generated session as a JSON response with a 200 status code.

    const params = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Pro subscription',
              },
              unit_amount: formatAmountForStripe(10, 'usd'), // $10.00
              recurring: {
                interval: 'month',
                interval_count: 1,
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${req.headers.get(
          'Referer',
        )}result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get(
          'Referer',
        )}result?session_id={CHECKOUT_SESSION_ID}`,
      }
      
      const checkoutSession = await stripe.checkout.sessions.create(params)
      
      return NextResponse.json(checkoutSession, {
        status: 200,
      })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new NextResponse(JSON.stringify({ error: { message: error.message } }), {
      status: 500,
    })
  }
}

/*
1. Extract the `session_id` from the request's query parameters.
2. If the `session_id` is missing, throw an error.
3. Use the Stripe API to fetch the checkout session details.
4. Return the retrieved session details as a JSON response.
5. If an error occurs, respond with a 500 status code and the error message.
*/
export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    const session_id = searchParams.get('session_id')
  
    try {
      if (!session_id) {
        throw new Error('Session ID is required')
      }
  
      const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
  
      return NextResponse.json(checkoutSession)
    } catch (error) {
      console.error('Error retrieving checkout session:', error)
      return NextResponse.json({ error: { message: error.message } }, { status: 500 })
    }
  }