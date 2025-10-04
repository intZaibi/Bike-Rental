"use client";

import React from 'react';
import { CheckCircle, Calendar, MapPin, CreditCard } from 'lucide-react';

interface PaymentSuccessProps {
  paymentIntent: any;
  rentalDetails: {
    bikeName: string;
    startDate: string;
    endDate: string;
    days: number;
    total: number;
  };
  onBackToBooking: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({
  paymentIntent,
  rentalDetails,
  onBackToBooking,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">
            Your bike rental has been confirmed. You'll receive a confirmation email shortly.
          </p>
        </div>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Details
          </h2>
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-mono text-xs sm:text-sm text-gray-900 break-all">
                {paymentIntent.id}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount Paid</span>
              <span className="font-semibold text-green-600">
                ${(paymentIntent.amount / 100).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className="text-green-600 font-medium capitalize">
                {paymentIntent.status}
              </span>
            </div>
          </div>
        </div>

        {/* Rental Details */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Rental Details
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Bike</span>
              <span className="font-medium text-gray-900">{rentalDetails.bikeName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rental Period</span>
              <span className="font-medium text-gray-900">
                {rentalDetails.startDate} - {rentalDetails.endDate}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration</span>
              <span className="font-medium text-gray-900">{rentalDetails.days} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-semibold text-gray-900">${rentalDetails.total}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">What's Next?</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>We'll contact you within 24 hours to confirm delivery details</span>
            </li>
            <li className="flex items-start">
              <Calendar className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>Your bike will be delivered on {rentalDetails.startDate}</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>Keep your phone handy for delivery updates</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={onBackToBooking}
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-medium hover:bg-gray-300 transition-colors"
          >
            Book Another Bike
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
