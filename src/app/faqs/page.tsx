"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does the rental process work?",
    answer: "Browse our collection, select your gown, book your dates, and pick up your dress. After your event, simply return it to us. It's that simple!"
  },
  {
    question: "How long can I rent a gown?",
    answer: "Our standard rental period is 3-5 days. If you need the gown for a longer period, please contact us to discuss extended rental options and pricing."
  },
  {
    question: "What if the gown doesn't fit?",
    answer: "We recommend trying on the gown during pickup. If it doesn't fit perfectly, we can help you select an alternative gown on the spot, subject to availability."
  },
  {
    question: "What are your payment terms?",
    answer: "We require a deposit upon booking to secure your gown. The remaining balance is due upon pickup. We accept cash and online payment methods."
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes, you can cancel or reschedule your booking. Please contact us at least 7 days before your pickup date. Cancellation and rescheduling policies apply."
  },
  {
    question: "What if I damage the gown?",
    answer: "Minor wear and tear is expected. However, significant damage or stains may incur additional cleaning or repair fees. We recommend treating the gown with care."
  },
  {
    question: "Do you offer alterations?",
    answer: "Minor alterations may be available for certain gowns. Please inquire when booking. Note that major alterations are not permitted on rental gowns."
  },
  {
    question: "How do I know if a gown is available for my dates?",
    answer: "Check the availability when browsing our collection online, or contact us directly to confirm availability for your specific dates."
  },
  {
    question: "Where are you located?",
    answer: "We are located in Ormoc City. You can visit our shop to view our collection in person or contact us for more information."
  },
  {
    question: "Do you deliver?",
    answer: "Delivery options may be available for local customers. Please contact us to discuss delivery arrangements and fees."
  },
  {
    question: "What should I bring when picking up my gown?",
    answer: "Please bring a valid ID and your booking confirmation. The remaining balance payment is also due at pickup."
  },
  {
    question: "How should I care for the gown while I have it?",
    answer: "Hang the gown properly, avoid eating messy foods while wearing it, and keep it away from potential stains. Professional cleaning is included in your rental fee."
  }
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl font-light tracking-wide text-gray-800 mb-16 text-center">
          FAQS
        </h1>

        <div className="space-y-1">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-800 pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
