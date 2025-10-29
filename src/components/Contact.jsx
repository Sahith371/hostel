import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useState } from 'react';

export default function Contact() {
  const [ref, isVisible] = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+62 361 123 4567', '+62 812 3456 7890'],
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@serenityhaven.com', 'booking@serenityhaven.com'],
      color: 'from-amber-400 to-amber-600',
    },
    {
      icon: MapPin,
      title: 'Location',
      details: ['123 Beach Road, Canggu', 'Bali, Indonesia 80361'],
      color: 'from-green-400 to-green-600',
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Reception: 24/7', 'Check-in: 2PM - 10PM'],
      color: 'from-purple-400 to-purple-600',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Get In <span className="text-amber-600">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions? We're here to help you plan your perfect stay
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div
              className={`bg-white rounded-3xl shadow-xl p-8 md:p-12 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                  <MessageSquare className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Send us a message</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-300 group-hover:border-gray-300"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="group">
                    <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-300 group-hover:border-gray-300"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-300 group-hover:border-gray-300"
                    placeholder="+1 234 567 890"
                  />
                </div>

                <div className="group">
                  <label className="block text-gray-700 font-medium mb-2">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-300 resize-none group-hover:border-gray-300"
                    placeholder="Tell us about your travel plans..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="group relative w-full md:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-lg font-semibold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span className="relative z-10">Send Message</span>
                  <Send className="relative z-10" size={20} />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 cursor-default transform hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                  >
                    <info.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                      {info.title}
                    </h4>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative h-96 bg-gray-200">
            <iframe
              src="https://maps.google.com/maps?q=16.4853,80.6916&hl=en&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="V.R. Siddhartha Engineering College Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
