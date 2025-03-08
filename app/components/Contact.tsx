"use client"
import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

function ContactUs() {
  return (
    <section id="contact" className="py-20 px-4 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Contact Us
        </h2>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side: Contact Details */}
          <div className="text-white space-y-6">
            <h3 className="text-2xl font-semibold">Get in Touch</h3>
            <p className="text-gray-400">
              Have questions or need help? Reach out to us and we’ll be happy to assist you.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="w-6 h-6 mr-4 text-purple-500" />
                <span>+91 9871262192</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 mr-4 text-purple-500" />
                <span>contact@kallistawears.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-6 h-6 mr-4 text-purple-500" />
                <span>Vellore, Tamil Nadu</span>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <form className="space-y-4 bg-gray-900 p-6 rounded-lg shadow-lg">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
