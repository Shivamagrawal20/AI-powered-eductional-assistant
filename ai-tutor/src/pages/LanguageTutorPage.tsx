import React from 'react';

const LanguageTutorPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-pink-600 text-white py-8 px-4 rounded-t-lg">
          <h1 className="text-3xl font-bold mb-2">Language Arts Tutor</h1>
          <p className="text-pink-100">Grammar correction, writing assistance, and vocabulary building</p>
        </div>
        
        <div className="bg-white shadow-lg rounded-b-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Coming Soon!</h2>
            <p className="text-gray-600 mb-4">
              We're working hard to bring you an amazing Language Arts tutoring experience. 
              The Language Arts Tutor will feature:
            </p>
            
            <ul className="text-left max-w-md mx-auto space-y-3 text-gray-600">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-pink-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Advanced grammar and style correction for essays and reports</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-pink-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Vocabulary enhancement with contextual examples</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-pink-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Literature analysis and interpretation assistance</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-pink-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Writing structure and flow improvements</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-8">
            <button className="bg-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors opacity-60 cursor-not-allowed">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageTutorPage; 