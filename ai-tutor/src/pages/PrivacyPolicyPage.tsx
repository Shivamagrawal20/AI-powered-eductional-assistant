import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PrivacyPolicyPage: React.FC = () => {
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
            <span className="mr-2 text-3xl">🔒</span> Privacy Policy
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </motion.div>

        <motion.div 
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="bg-white shadow-md rounded-lg p-8"
        >
          <div className="space-y-8">
            <section className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Data, Your Control.</h2>
              <p className="text-gray-600">
                We care deeply about your privacy and are committed to protecting your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. What We Collect:</h2>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Name, email, and user profile info</li>
                <li>Learning progress and preferences</li>
                <li>Device and usage data (to improve platform performance)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. How We Use It:</h2>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Personalize your learning journey</li>
                <li>Improve platform features and user experience</li>
                <li>Communicate updates, offers, or support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Data Security:</h2>
              <p className="text-gray-600">
                Your data is encrypted and stored securely. We follow strict protocols to prevent unauthorized access.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. No Sharing Without Consent:</h2>
              <p className="text-gray-600">
                We do not sell or rent your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Your Rights:</h2>
              <p className="text-gray-600">
                You can update, delete, or request access to your data anytime. Just email us at <a href="mailto:privacy@ailearningtutor.com" className="text-indigo-600 hover:text-indigo-800">privacy@ailearningtutor.com</a>
              </p>
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

export default PrivacyPolicyPage; 