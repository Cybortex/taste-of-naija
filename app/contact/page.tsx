"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageSquare, Check } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "Table Reservation",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiryType: "Table Reservation",
        message: "",
      });
    }, 2000);
  };

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green/10 px-3 py-1 rounded-full">
          Get In Touch
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-brand-deep">
          Visit Us or Send a Message
        </h1>
        <p className="text-sm text-brand-muted">
          Reservations, event catering, corporate orders, or just saying hello — we’re always ready to serve you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Info & Address */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-card space-y-6">
            <h2 className="font-heading font-bold text-xl text-brand-deep">
              Restaurant Details
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-brand-deep">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold block">Victoria Island Location</span>
                  <span className="text-brand-muted leading-relaxed">
                    14 Adeola Odeku Street, Victoria Island, Lagos, Nigeria
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold block">Helpline & Custom Orders</span>
                  <a href="tel:09071649725" className="text-brand-green font-bold leading-relaxed block hover:underline">
                    09071649725 (Call for Custom Orders)
                  </a>
                  <a
                    href="https://wa.me/2349071649725"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-muted leading-relaxed block hover:text-brand-green"
                  >
                    WhatsApp: 09071649725
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold block">Dining & Kitchen Hours</span>
                  <span className="text-brand-muted leading-relaxed block">
                    Monday – Sunday: 11:00 AM – 10:00 PM
                  </span>
                  <span className="text-xs text-brand-green font-medium">
                    (Kitchen closes at 9:30 PM for final orders)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold block">Email Inquiries</span>
                  <span className="text-brand-muted leading-relaxed">
                    orders@tasteofnaija.ng / events@tasteofnaija.ng
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map card mockup */}
          <div className="bg-[#0c4e28] text-white p-6 rounded-3xl relative overflow-hidden shadow-sm">
            <div className="relative z-10 space-y-2">
              <span className="text-xs uppercase font-mono text-brand-gold tracking-widest">
                Parking & Access
              </span>
              <h3 className="font-heading font-bold text-lg text-white">
                Valet & Dedicated Customer Parking
              </h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Secure compound parking with 24/7 security personnel right on Adeola Odeku Street.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Reservation / Inquiry Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-card">
          <h2 className="font-heading font-bold text-xl text-brand-deep mb-1">
            Send an Inquiry or Reserve a Table
          </h2>
          <p className="text-xs text-brand-muted mb-6">
            Fill in your details below and our restaurant manager will respond within 30 minutes.
          </p>

          {submitted ? (
            <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center mx-auto shadow-md">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="font-heading font-bold text-lg text-brand-deep">
                Message Received!
              </h3>
              <p className="text-xs text-brand-muted max-w-sm mx-auto">
                Thank you for contacting Taste of Naija. We’ve received your request and will call or email you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-deep mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Bukola Adeleke"
                    className="w-full h-11 px-3.5 rounded-input border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-accent text-xs sm:text-sm text-brand-deep bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-deep mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 0812 345 6789"
                    className="w-full h-11 px-3.5 rounded-input border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-accent text-xs sm:text-sm text-brand-deep bg-stone-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-deep mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. bukola@example.com"
                    className="w-full h-11 px-3.5 rounded-input border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-accent text-xs sm:text-sm text-brand-deep bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-deep mb-1">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-input border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-accent text-xs sm:text-sm text-brand-deep bg-stone-50/50"
                  >
                    <option value="Table Reservation">Table Reservation</option>
                    <option value="Event Catering (Owambe/Office)">Event Catering / Corporate</option>
                    <option value="Delivery Order Follow-up">Delivery Order Inquiry</option>
                    <option value="General Feedback">General Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-deep mb-1">
                  Message / Booking Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your requested date, number of guests, or catering requirements..."
                  className="w-full p-3.5 rounded-input border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-accent text-xs sm:text-sm text-brand-deep bg-stone-50/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-btn bg-brand-green hover:bg-brand-green-hover text-white font-heading font-bold text-sm shadow-sm transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
