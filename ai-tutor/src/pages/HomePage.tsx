import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/auth/AuthModal';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleStartLearning = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setIsAuthModalOpen(true);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 text-gray-900 min-h-screen w-full">
        <div className="w-full h-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16 h-full max-w-[2000px] mx-auto">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                Master Any Subject with AI-Powered Learning
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 max-w-2xl leading-relaxed opacity-90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Experience personalized education powered by Groq's ultra-fast AI. 
                Get real-time assistance across multiple subjects through text, audio, and visual inputs.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <Link 
                  to="/math" 
                  className="bg-white text-indigo-600 font-semibold py-4 px-8 rounded-xl shadow-lg hover:bg-indigo-50 transition-all duration-300 text-center text-lg transform hover:scale-105"
                  onClick={(e) => handleStartLearning(e, '/math')}
                >
                  Start Learning
                </Link>
                <a 
                  href="#features" 
                  className="bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/10 transition-all duration-300 text-center text-lg transform hover:scale-105"
                >
                  Learn More
                </a>
              </motion.div>
            </div>
            <motion.div 
              className="md:w-1/2 max-w-2xl w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
            >
              <div className="relative bg-white/10 p-8 rounded-2xl backdrop-blur-sm shadow-2xl border border-white/20">
                <div className="absolute -top-4 -left-4 bg-green-400 rounded-full w-8 h-8 animate-pulse"></div>
                <div className="absolute -top-4 -right-4 bg-amber-400 rounded-full w-8 h-8 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 bg-red-400 rounded-full w-8 h-8 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 bg-blue-400 rounded-full w-8 h-8 animate-pulse"></div>
                <div className="space-y-6">
                  <div className="p-6 bg-white/10 rounded-xl">
                    <h3 className="font-semibold mb-3 text-lg">AI Tutor</h3>
                    <p className="text-base opacity-90">How do I solve the quadratic equation x² + 5x + 6 = 0?</p>
                  </div>
                  <div className="p-6 bg-indigo-600/20 rounded-xl">
                    <h3 className="font-semibold mb-3 text-lg">Solution</h3>
                    <ol className="list-decimal list-inside text-base space-y-3 opacity-90">
                      <li>Identify that this is in the form ax² + bx + c where a=1, b=5, c=6</li>
                      <li>Factor: x² + 5x + 6 = (x + 2)(x + 3)</li>
                      <li>Set each factor equal to zero: x + 2 = 0 or x + 3 = 0</li>
                      <li>Therefore, x = -2 or x = -3</li>
                    </ol>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="w-full">
          <div className="max-w-[2000px] mx-auto">
            <div className="text-center mb-20">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                Intelligent Learning Features
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Our AI-powered platform provides a comprehensive learning experience through cutting-edge features
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                title="Multimodal Input"
                description="Upload text, images, or use voice to interact with our AI tutor naturally."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                }
              />
              <FeatureCard 
                title="Multiple Subjects"
                description="Mathematics, Programming, Science, and Language Arts coverage."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                }
              />
              <FeatureCard 
                title="Real-Time Feedback"
                description="Instant assessment of your work with personalized guidance."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              />
              <FeatureCard 
                title="Interactive Learning"
                description="Visual demonstrations and gamified challenges to boost engagement."
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Subject Overview */}
      <section className="py-24 bg-gray-50">
        <div className="w-full">
          <div className="max-w-[2000px] mx-auto">
            <div className="text-center mb-20">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                Explore Learning Subjects
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Dive into any subject area with personalized AI assistance
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <SubjectCard 
                title="Mathematics"
                description="Step-by-step problem solving with visual explanations. From basic arithmetic to advanced calculus."
                link="/math"
                imageSrc="https://images.unsplash.com/photo-1635070041078-e363dbe005cb"
                color="from-blue-500 to-cyan-400"
                onLinkClick={handleStartLearning}
              />
              <SubjectCard 
                title="Programming"
                description="Code analysis, error detection, and optimization suggestions. Learn multiple programming languages with ease."
                link="/programming"
                imageSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                color="from-green-500 to-emerald-400"
                onLinkClick={handleStartLearning}
              />
              <SubjectCard 
                title="Science"
                description="Interactive explanations of concepts with visual aids. Biology, Physics, Chemistry, and more."
                link="/science"
                imageSrc="https://images.unsplash.com/photo-1564325724739-bae0bd08762c"
                color="from-purple-500 to-indigo-400"
                onLinkClick={handleStartLearning}
              />
              <SubjectCard 
                title="Language Arts"
                description="Grammar correction, writing assistance, and vocabulary building. Enhance your communication skills."
                link="/language"
                imageSrc="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8"
                color="from-red-500 to-pink-400"
                onLinkClick={handleStartLearning}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50 text-gray-900">
        <div className="w-full">
          <div className="max-w-[2000px] mx-auto text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Learning?
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join thousands of students who have accelerated their education with our AI-powered platform.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link
                to="/math"
                className="inline-block bg-indigo-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 text-lg transform hover:scale-105"
                onClick={(e) => handleStartLearning(e, '/math')}
              >
                Start Learning Now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        message="Please log in or sign up to start learning with our AI tutors."
      />
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="text-indigo-500 mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-lg">{description}</p>
    </motion.div>
  );
};

interface SubjectCardProps {
  title: string;
  description: string;
  link: string;
  imageSrc: string;
  color: string;
  onLinkClick?: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ title, description, link, imageSrc, color, onLinkClick }) => {
  return (
    <motion.div 
      className="rounded-2xl overflow-hidden shadow-xl relative group"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-10 group-hover:opacity-40 transition-opacity duration-300"></div>
      <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-90 z-20 group-hover:opacity-80 transition-opacity duration-300`}></div>
      <img src={imageSrc} alt={title} className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 z-30 p-8 flex flex-col justify-end">
        <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
        <p className="text-white/90 text-lg mb-6">{description}</p>
        <Link
          to={link}
          className="bg-white/20 text-white border-2 border-white/40 hover:bg-white/30 transition-all duration-300 inline-block py-3 px-6 rounded-xl backdrop-blur-sm w-max text-lg font-semibold transform hover:scale-105"
          onClick={(e) => onLinkClick && onLinkClick(e, link)}
        >
          Explore {title}
        </Link>
      </div>
    </motion.div>
  );
};

export default HomePage; 