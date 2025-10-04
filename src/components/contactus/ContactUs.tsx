"use client";
import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const ContactUsPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs: FAQ[] = [

    {
      question: "What do I need to bring for bike rental?",
      answer: "Please bring a valid photo ID (driver's license, passport, or state ID) and a credit card. We also recommend comfortable clothing and closed-toe shoes."
    },
    {
      question: "Are helmets included with bike rentals?",
      answer: "No. However, if available at the time of purchase, you may add a complimentary helmet, bike lock, and or other equipment."
    },
    {
      question: "What happens if my bike breaks down during rental?",
      answer: "Contact the brand of the bike you've been given, as we provide bikes from various brands."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with our team for bike rentals, support, or any questions you may have.
          </p>
        </div>

        {/* Contact Numbers Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-8">

            {/* Customer Service */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Mail className="h-5 w-5 text-black mr-2" />
                Email Support
              </h3>
              <div className="text-gray-600 space-y-1">
                <p>Lighting Bike Email Support</p>
                <p>Orlando, Florida, USA</p>
                <p className="text-sm text-black mt-3">
                  <a href="mailto:support@bikerent.com">info@lightingbike.com</a>
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Clock className="h-5 w-5 text-black mr-2" />
                Business Hours
              </h3>
              <div className="text-gray-600 space-y-1">
                <p><span className="font-medium">Monday - Friday:</span> 6:00 AM - 10:00 PM</p>
                <p><span className="font-medium">Saturday:</span> 8:00 AM - 8:00 PM</p>
                <p><span className="font-medium">Sunday:</span> 8:00 AM - 6:00 PM</p>
                {/* <p className="text-sm text-green-600 mt-3">
                  Emergency support available 24/7
                </p> */}
              </div>
            </div>
            {/* Customer Service */}
            {/* <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Phone className="h-5 w-5 text-black mr-2" />
                Customer Service & Bike Rentals
              </h3>
              <div className="space-y-3 text-gray-600">
                <p><span className="font-medium">General Inquiries:</span> 1-800-BIKE-RENT</p>
                <p><span className="font-medium">Rental Bookings:</span> 1-855-RESERVE</p>
                <p><span className="font-medium">24/7 Emergency Support:</span> 1-800-HELP-NOW</p>
                <p className="text-sm text-gray-500 mt-4">
                  Customer service representatives are available daily from 6 AM to 10 PM PST
                </p>
              </div>
            </div> */}

            {/* Technical Support */}
            {/* <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MessageCircle className="h-5 w-5 text-black mr-2" />
                Technical & App Support
              </h3>
              <div className="space-y-3 text-gray-600">
                <p><span className="font-medium">App Issues:</span> 1-844-APP-HELP</p>
                <p><span className="font-medium">Online Bookings:</span> 1-844-WEB-RENT</p>
                <p><span className="font-medium">Payment Problems:</span> 1-855-PAY-HELP</p>
                <div className="mt-4">
                  <p className="font-medium text-gray-700">Short Codes:</p>
                  <p className="text-sm"><strong>BALANCE (#2252)</strong> - Check your account balance</p>
                  <p className="text-sm"><strong>MINUTES (#6463)</strong> - View rental minutes remaining</p>
                  <p className="text-sm"><strong>HELP (#4357)</strong> - Get quick support</p>
                </div>
              </div>
            </div> */}
          {/* </div> */}
        </div>

        {/* Addresses Section */}
        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Locations</h2>
          <div className="grid md:grid-cols-3 gap-6"> */}
            {/* Main Office */}
            {/* <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <MapPin className="h-5 w-5 text-black mr-2" />
                Main Office
              </h3>
              <div className="text-gray-600 space-y-1">
                <p>BikeRent Headquarters</p>
                <p>123 Cycle Street</p>
                <p>San Francisco, CA 94105</p>
                <p className="text-sm text-gray-500 mt-3">
                  Please don't send payments to this address
                </p>
              </div>
            </div> */}

            {/* Customer Service */}
            {/* <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Mail className="h-5 w-5 text-black mr-2" />
                Customer Service
              </h3>
              <div className="text-gray-600 space-y-1">
                <p>BikeRent Customer Care</p>
                <p>PO Box 98765</p>
                <p>Los Angeles, CA 90015-3410</p>
                <p className="text-sm text-black mt-3">
                  <a href="mailto:support@bikerent.com">support@bikerent.com</a>
                </p>
              </div>
            </div> */}

            {/* Business Hours */}
            {/* <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Clock className="h-5 w-5 text-black mr-2" />
                Business Hours
              </h3>
              <div className="text-gray-600 space-y-1">
                <p><span className="font-medium">Monday - Friday:</span> 6:00 AM - 10:00 PM</p>
                <p><span className="font-medium">Saturday:</span> 8:00 AM - 8:00 PM</p>
                <p><span className="font-medium">Sunday:</span> 8:00 AM - 6:00 PM</p>
                <p className="text-sm text-green-600 mt-3">
                  Emergency support available 24/7
                </p>
              </div>
            </div>
          </div> */}
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-black flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-black flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
