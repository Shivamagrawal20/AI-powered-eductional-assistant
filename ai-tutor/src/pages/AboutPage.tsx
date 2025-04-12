import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
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

  // Handle scroll to top
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
            <span className="mr-2 text-3xl">✅</span> About Us
          </h1>
          <p className="mt-3 text-lg text-gray-600 font-medium">
            Empowering Learning Through AI
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
              <p className="text-gray-700 leading-relaxed mb-6">
                At AI Learning Tutor, our mission is to revolutionize education by combining cutting-edge AI technology with human-centered learning. We provide smart, adaptive tutoring experiences that meet each learner at their level, helping them grow faster, learn smarter, and achieve more.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Whether you're a student looking to improve, a parent seeking support, or an educator exploring digital tools—our platform is built to empower you with 24/7 intelligent assistance, real-time progress tracking, and personalized content curated by top educators.
              </p>

              <div className="mt-10 border-t border-gray-200 pt-8">
                <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
                  Welcome to the future of learning.
                </h2>
                <p className="text-lg font-medium text-center text-indigo-600">
                  Learn better. Learn smarter. With AI.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200 text-center">
            <Link 
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleScrollToTop}
            >
              Return to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage; 