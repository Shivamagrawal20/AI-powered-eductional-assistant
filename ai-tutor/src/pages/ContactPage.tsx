import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ContactPage: React.FC = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the feedback to your backend
    // For now, we'll just simulate a successful submission
    setIsSubmitted(true);
    setFeedbackText('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center">
            <span className="mr-2 text-3xl">📞</span> Contact Us
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Have a question, need help, or just want to say hi? We're here for you!
          </p>
        </motion.div>

        <motion.div 
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="bg-white shadow-md rounded-lg p-8"
        >
          <div className="space-y-8">
            <section className="pb-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">📧</span> Email Support
              </h2>
              <p className="text-gray-600">
                Reach out to us at <a href="mailto:support@ailearningtutor.com" className="text-indigo-600 hover:text-indigo-800">support@ailearningtutor.com</a> for any queries related to the platform, billing, or technical help.
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Response time:</span> within 24 hours.
              </p>
            </section>

            <section className="pb-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">💬</span> Live Chat
              </h2>
              <p className="text-gray-600">
                Need quick help? Use our live chat option in the bottom-right corner of the screen.
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Available:</span> Monday to Saturday, 9 AM – 7 PM (IST)
              </p>
            </section>

            <section className="pb-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">📞</span> Call Us
              </h2>
              <p className="text-gray-600">
                Prefer speaking to someone? Call our support line at <a href="tel:+91XXXXXXXX" className="text-indigo-600 hover:text-indigo-800">+91-XXX-XXX-XXXX</a>
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Available:</span> Weekdays, 10 AM – 6 PM (IST)
              </p>
            </section>

            <section className="pb-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">📍</span> Office Address
              </h2>
              <p className="text-gray-600">
                AI Learning Tutor<br />
                Sector 18, Noida, Uttar Pradesh, India
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">📝</span> Feedback & Suggestions
              </h2>
              <p className="text-gray-600 mb-4">
                We're always looking to improve. Drop your ideas or feedback here.
              </p>
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 text-green-700">
                  Thank you for your feedback! We appreciate your input and will use it to improve our platform.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <textarea 
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
                      rows={5}
                      placeholder="Your feedback or suggestions..."
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div>
                    <button 
                      type="submit"
                      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </form>
              )}
            </section>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200 text-center">
            <Link 
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Return to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage; 