import { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import SEO from '../components/SEO';
import { SITE_INFO } from '../constants/siteData';
import { COURSES } from '../constants/coursesData';

const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const sortedCourses = [...COURSES].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    course: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Initialize EmailJS with your public key
      emailjs.init(publicKey); // Replace with your actual public key

      const result = await emailjs.send(
        serviceId, // Replace with your service ID
        templateId, // Replace with your template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          course: formData.course,
          to_email: SITE_INFO.email,
        }
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          course: '',
        });
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Gyanplanet Institute. Contact us for course inquiries, admissions, or any questions about our educational programs."
        keywords="contact, admission, inquiry, phone, email, address, gyanplanet institute"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <section className="bg-primary-600 text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-2">
                Contact Us
              </h1>
              <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto px-4">
                Ready to start your learning journey? Get in touch with us
                today. We're here to help you choose the right course for your
                goals.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Send us a Message
                </h2>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    <p className="text-green-800">
                      Thank you! Your message has been sent successfully. We'll
                      get back to you soon.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-600" />
                    <p className="text-red-800">
                      Sorry, there was an error sending your message. Please try
                      again or contact us directly.
                    </p>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="+91-9876543210"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="course"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Interested Course
                      </label>
                      <select
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                      >
                        <option value="">Select a course</option>
                        {sortedCourses.map(course => (
                          <option key={course.id} value={course.name}>
                            {course.name}
                          </option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-6 sm:space-y-8">
                {/* Contact Details */}
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Get in Touch
                  </h2>

                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                          Visit Our Campus
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                          {SITE_INFO.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <PhoneIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                          Call Us
                        </h3>
                        <a
                          href={`tel:${SITE_INFO.phone}`}
                          className="text-primary-600 hover:text-primary-700 text-sm sm:text-base"
                        >
                          {SITE_INFO.phone}
                        </a>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Mon-Sat: 7:00 AM - 9:00 PM
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <EnvelopeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                          Email Us
                        </h3>
                        <a
                          href={`mailto:${SITE_INFO.email}`}
                          className="text-primary-600 hover:text-primary-700 text-sm sm:text-base break-all"
                        >
                          {SITE_INFO.email}
                        </a>
                        <p className="text-xs sm:text-sm text-gray-500">
                          We'll respond within 24 hours
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <ClockIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                          Office Hours
                        </h3>
                        <div className="text-gray-600 space-y-1 text-xs sm:text-sm">
                          <p>Morning: 7:00 AM - 12:00 PM</p>
                          <p>Evening: 3:00 PM - 9:00 PM</p>
                          <p>Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/${SITE_INFO.whatsapp}?text=Hi! I'd like to know more about your courses.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                    >
                      <span>💬</span>
                      <span>WhatsApp Us</span>
                    </a>
                    <a
                      href={`tel:${SITE_INFO.phone}`}
                      className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                    >
                      <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Find Us
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Visit our campus and experience our learning environment
              </p>
            </div>

            <div className="h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={SITE_INFO.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Gyanplanet Institute Location"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
