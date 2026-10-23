"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How does the ₦250 takeaway packaging fee work?",
    answer:
      "Every main dish, plate, or combo you order for takeaway counts as one pack (₦250 fee). For instance, Pounded Yam & Egusi (or a plate of Party Jollof) is 1 pack. Meats, seafood, and side dishes like Dodo and Moi Moi never incur pack charges. If you order 2 Party Jollof plates, 1 Fried Chicken, and 1 Dodo, your total pack fee is 2 × ₦250 = ₦500.",
  },
  {
    question: "What is the policy for Home Delivery fees?",
    answer:
      "We offer flat-rate delivery across our primary coverage zones (Victoria Island, Ikoyi, Lekki Phase 1 & 2, Oniru, Marina) for ₦3,000 flat. The minimum order value for delivery is ₦10,000. When your food subtotal reaches ₦35,000, Home Delivery becomes completely FREE!",
  },
  {
    question: "How do you package soups and swallows so they don't spill in transit?",
    answer:
      "Every single soup, pepper soup, and stew is packed in heavy-duty, food-grade, airtight tamper-evident containers with heat-sealed rims. Swallows are wrapped fresh while steaming hot and packed in separate insulated compartments. All orders travel in thermal insulated delivery boxes on our dispatch bikes.",
  },
  {
    question: "Can I request custom catering or special orders?",
    answer:
      "Yes! All our dishes are cooked to traditional authentic Nigerian recipes. If you have custom orders, corporate catering, or special requests, you can call our direct helpline at 09071649725 or message us on WhatsApp.",
  },
  {
    question: "Do I have to pay online if I am dining in?",
    answer:
      "No! When you choose 'Dine-in Pre-order', your food and table reservation are confirmed without any online payment. You pay directly at the restaurant after being seated and enjoying your meal.",
  },
  {
    question: "Which payment methods are accepted online?",
    answer:
      "For Takeaway and Home Delivery, we use Paystack’s bank-grade encrypted checkout. You can pay with Nigerian debit cards (Mastercard, Visa, Verve), Direct Bank Transfer, USSD, and Apple Pay.",
  },
  {
    question: "How far in advance can I place a Dine-in pre-order?",
    answer:
      "You can place a dine-in pre-order for any time during our operating hours (11:00 AM – 10:00 PM) on the same day. We hold your table for up to 20 minutes past your reserved arrival slot.",
  },
  {
    question: "Do you cater for office parties and large events?",
    answer:
      "Yes! We regularly provide catering trays and individual boxed packs for corporate meetings, birthday celebrations, and family gatherings across Lagos. Contact us via our contact page, chat on WhatsApp at 09071649725, or call our direct helpline at 09071649725 for custom orders and event menus.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-[850px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green/10 px-3 py-1 rounded-full">
          Questions & Answers
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-brand-deep">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-brand-muted">
          Everything you need to know about our authentic dishes, order flow, packaging, and delivery.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-brand-border/80 shadow-2xs overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm sm:text-base text-brand-deep hover:text-brand-green transition-colors"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-brand-muted shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-brand-green" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-brand-muted leading-relaxed border-t border-brand-border/40">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still have questions */}
      <div className="p-6 rounded-3xl bg-brand-cream border border-brand-border text-center space-y-3">
        <h3 className="font-heading font-bold text-lg text-brand-deep">
          Still Have a Question?
        </h3>
        <p className="text-xs text-brand-muted max-w-md mx-auto">
          Our team is available on WhatsApp daily from 11:00 AM to 10:00 PM to assist you with special requests or large orders.
        </p>
        <div className="pt-1">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white font-bold text-xs px-5 py-2.5 rounded-btn shadow-xs transition-colors"
          >
            <span>Contact Customer Support</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
