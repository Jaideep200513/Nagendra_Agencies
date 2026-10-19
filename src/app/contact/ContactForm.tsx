'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, MessageCircle, Send } from 'lucide-react';
import { getAllCategories } from '../../data/products';

export function ContactForm() {
  const categories = getAllCategories();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Rice Machine');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    setCategory('Rice Machine');
    setCity('');
    setMessage('');
  };

  const whatsappText = encodeURIComponent(
    `Hello Nagendra Agencies, my name is ${name}. I am inquiring about ${category} machinery for our facility in ${city}. Phone: ${phone}. Requirements: ${message}`
  );

  return (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
        <motion.div 
          key="success"
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-center py-10 space-y-5 bg-neutral-50 rounded-lg p-8 sm:p-10 border border-neutral-300 shadow-sm"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm border border-emerald-200">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h3 className="text-2xl font-heading font-black text-neutral-950">
            Inquiry Successfully Registered
          </h3>
          <p className="text-base sm:text-lg text-neutral-700 max-w-lg mx-auto leading-relaxed">
            Thank you, <strong className="text-neutral-950">{name}</strong>. Your requirement for{' '}
            <strong className="text-brand-orange">{category}</strong> has been logged for our Secunderabad office. Our commercial team will call you at <strong className="text-neutral-950">{phone}</strong> within 24 business hours.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-3.5 rounded-md bg-neutral-950 text-white font-bold text-sm sm:text-base hover:bg-neutral-800 transition-all duration-200 shadow-sm active:scale-95 hover:-translate-y-0.5"
            >
              Submit Another Requirement
            </button>

            <a
              href={`https://wa.me/9104027707687?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-emerald-700 text-white font-bold text-sm sm:text-base hover:bg-emerald-800 transition-all duration-200 shadow-sm active:scale-95 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" /> Open in WhatsApp
            </a>
          </div>
        </motion.div>
      ) : (
        <motion.form 
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          {/* Row 1: Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm sm:text-base font-bold text-neutral-900 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full text-base px-4 py-3 rounded-md border border-neutral-300 bg-neutral-50 text-neutral-950 placeholder-neutral-400 focus:bg-white focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-200 font-medium"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-bold text-neutral-900 mb-1.5">
                Mobile / Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full text-base px-4 py-3 rounded-md border border-neutral-300 bg-neutral-50 text-neutral-950 placeholder-neutral-400 focus:bg-white focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-200 font-medium"
              />
            </div>
          </div>

          {/* Row 2: Email & Facility Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm sm:text-base font-bold text-neutral-900 mb-1.5">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. ramesh@example.com"
                className="w-full text-base px-4 py-3 rounded-md border border-neutral-300 bg-neutral-50 text-neutral-950 placeholder-neutral-400 focus:bg-white focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-200 font-medium"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base font-bold text-neutral-900 mb-1.5">
                Mill / Plant Location (City, State) *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Nizamabad, Telangana"
                className="w-full text-base px-4 py-3 rounded-md border border-neutral-300 bg-neutral-50 text-neutral-950 placeholder-neutral-400 focus:bg-white focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-200 font-medium"
              />
            </div>
          </div>

          {/* Row 3: Machinery Category */}
          <div>
            <label className="block text-sm sm:text-base font-bold text-neutral-900 mb-1.5">
              Machinery Category of Interest
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-base px-4 py-3 rounded-md border border-neutral-300 bg-white text-neutral-950 font-semibold focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 cursor-pointer transition-all duration-200"
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.name}>
                  {c.name} ({c.productCount} Models Available)
                </option>
              ))}
              <option value="Complete Turnkey Rice Mill Plant">Complete Turnkey Rice Mill Plant Setup</option>
            </select>
          </div>

          {/* Row 4: Requirements Description */}
          <div>
            <label className="block text-sm sm:text-base font-bold text-neutral-900 mb-1.5">
              Equipment Requirements & Desired Capacity
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Mention desired output capacity (e.g. 2 tons/hr, 50 tons/day), raw grain type, power availability (415V 3-phase), or target delivery timeline..."
              className="w-full text-base px-4 py-3 rounded-md border border-neutral-300 bg-neutral-50 text-neutral-950 placeholder-neutral-400 focus:bg-white focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-200 font-medium"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2.5 bg-brand-orange hover:bg-orange-700 text-white font-bold text-base sm:text-lg py-4 px-6 rounded-md transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] hover:-translate-y-0.5"
            >
              <Send className="w-5 h-5 text-white" />
              Submit Requirement to Commercial Desk
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
