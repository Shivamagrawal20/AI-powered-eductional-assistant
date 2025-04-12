import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FAQPage: React.FC = () => {
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

  const faqItems = [
    {
      question: "What is AI Learning Tutor?",
      answer: "AI Learning Tutor is an intelligent, modern online platform that uses artificial intelligence to personalize and enhance the learning experience for students. It adapts to each user's pace, style, and preferences to make learning more effective and engaging."
    },
    {
      question: "How does the AI tutor work?",
      answer: "The AI analyzes your learning patterns, performance, and feedback to recommend personalized study paths, practice questions, and resources. It can also simulate 24/7 tutoring sessions based on the latest educational techniques and data."
    },
    {
      question: "Is my personal data safe on this platform?",
      answer: "Absolutely. We use industry-standard encryption and data protection protocols to ensure your information is secure. We never share personal data with third parties without your consent."
    },
    {
      question: "What subjects or courses do you offer?",
      answer: "We currently support a wide range of subjects including Math, Science, English, Computer Science, and more. We also provide skill-building courses like coding, problem-solving, and exam prep."
    },
    {
      question: "Who creates the content used by the AI tutor?",
      answer: "All educational content is created and reviewed by qualified educators, subject matter experts, and instructional designers to ensure quality and relevance."
    },
    {
      question: "Do I need any special software or hardware?",
      answer: "Nope! Just a modern web browser and a stable internet connection. Our platform works smoothly on desktops, laptops, tablets, and even smartphones."
    },
    {
      question: "Is the AI tutor a replacement for human teachers?",
      answer: "Not at all. Our AI tutor is designed to complement human instruction by offering personalized support, instant feedback, and round-the-clock access to help."
    },
    {
      question: "How much does it cost?",
      answer: "We offer a variety of plans – from free basic access to premium plans with advanced features. Visit our Pricing page for detailed info."
    },
    {
      question: "Can parents or educators track progress?",
      answer: "Yes! We offer dashboards for both parents and educators to monitor student progress, performance metrics, and learning trends."
    },
    {
      question: "What if I face a technical issue?",
      answer: "You can contact our support team anytime via chat or email. We also have a Help Center with guides and troubleshooting tips."
    }
  ];

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
            <span className="mr-2 text-3xl">❓</span> Frequently Asked Questions
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Find answers to common questions about our AI Learning Tutor
          </p>
        </motion.div>

        <motion.div 
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="bg-white shadow-md rounded-lg p-8"
        >
          <div className="space-y-8">
            {faqItems.map((faq, index) => (
              <section key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {index + 1}. {faq.question}
                </h2>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </section>
            ))}
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

export default FAQPage; 