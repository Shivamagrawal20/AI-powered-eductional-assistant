import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TermsOfServicePage: React.FC = () => {
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
            <span className="mr-2 text-3xl">⚖️</span> Terms of Service
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
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. User Agreement</h2>
              <p className="text-gray-600">
                By accessing or using AI Learning Tutor, you agree to these terms. If you do not agree, please do not use the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. User Responsibilities</h2>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Use the platform ethically and legally</li>
                <li>Do not misuse or attempt to hack the system</li>
                <li>Respect the learning community</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Content Ownership</h2>
              <p className="text-gray-600">
                All educational content, platform designs, and AI models are the intellectual property of AI Learning Tutor. 
                You may not copy, resell, or redistribute them.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Payment & Plans</h2>
              <p className="text-gray-600">
                All payments are final unless stated otherwise in specific plan details. 
                For billing issues, reach out to <a href="mailto:billing@ailearningtutor.com" className="text-indigo-600 hover:text-indigo-800">billing@ailearningtutor.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Termination</h2>
              <p className="text-gray-600">
                We reserve the right to suspend or terminate accounts that violate these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Updates to Terms</h2>
              <p className="text-gray-600">
                We may update these terms as needed. Continued use of the platform means you accept the updated terms.
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

export default TermsOfServicePage; 