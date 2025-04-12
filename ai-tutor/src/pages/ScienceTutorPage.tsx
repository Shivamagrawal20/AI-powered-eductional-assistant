import React from 'react';

const ScienceTutorPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-purple-600 text-white py-8 px-4 rounded-t-lg">
          <h1 className="text-3xl font-bold mb-2">Science Tutor</h1>
          <p className="text-purple-100">Interactive explanations of concepts with visual aids</p>
        </div>
        
        <div className="bg-white shadow-lg rounded-b-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Coming Soon!</h2>
            <p className="text-gray-600 mb-4">
              We're working hard to bring you an amazing Science tutoring experience. 
              The Science Tutor will feature:
            </p>
            
            <ul className="text-left max-w-md mx-auto space-y-3 text-gray-600">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Interactive 3D models for complex scientific concepts</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Step-by-step explanations for Biology, Chemistry, and Physics</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Visual simulations of experiments and natural phenomena</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Personalized quizzes to test your understanding</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-8">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors opacity-60 cursor-not-allowed">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScienceTutorPage; 