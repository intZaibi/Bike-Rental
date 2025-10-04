# Stripe Checkout Integration Setup

This project now includes Stripe Checkout for bike rentals - a secure, hosted payment page that handles all payment processing. Follow these steps to complete the setup:

## 1. Stripe Account Setup

1. Create a Stripe account at [https://stripe.com](https://stripe.com)
2. Go to your Stripe Dashboard: [https://dashboard.stripe.com](https://dashboard.stripe.com)
3. Navigate to **Developers > API Keys**
4. Copy your **Publishable key** and **Secret key**

## 2. Environment Variables

Update your `.env.local` file with your actual Stripe keys:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here

# Webhook endpoint secret (for production)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## 3. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the bike booking page
3. Fill out the rental details
4. Click "Continue Checkout"
5. Use Stripe's test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **Requires Authentication**: `4000 0025 0000 3155`

## 4. Test Card Details

For testing, use these details with any test card:
- **Expiry**: Any future date (e.g., 12/25)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

## 5. Features Included

✅ **Stripe Checkout**: Secure, hosted payment page
✅ **Payment Success Page**: Confirmation with rental details
✅ **Error Handling**: User-friendly error messages
✅ **Responsive Design**: Works on all device sizes
✅ **Type Safety**: Full TypeScript support
✅ **Automatic Redirects**: Seamless return to your app

## 6. Production Setup

For production deployment:

1. Replace test keys with live keys
2. Set up webhook endpoints for payment confirmations
3. Configure proper error handling and logging
4. Add email notifications for successful payments
5. Implement proper order management system

## 7. Security Notes

- Never commit your secret keys to version control
- Use environment variables for all sensitive data
- Implement proper webhook signature verification
- Add rate limiting to payment endpoints
- Use HTTPS in production

## 8. Troubleshooting

**Common Issues:**

1. **"Stripe not loaded" error**: Check your publishable key
2. **Payment fails**: Verify your secret key and API version
3. **CORS errors**: Ensure your domain is whitelisted in Stripe dashboard

**Debug Mode:**
- Check browser console for client-side errors
- Check server logs for API errors
- Use Stripe Dashboard to monitor payment attempts

## 9. Next Steps

Consider implementing:
- Customer management
- Subscription payments
- Refund handling
- Invoice generation
- Email confirmations
- Order tracking system
