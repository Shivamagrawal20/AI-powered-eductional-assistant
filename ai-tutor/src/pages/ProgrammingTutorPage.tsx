import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProgrammingTutorPage: React.FC = () => {
  const [code, setCode] = useState('// Type or paste your code here\n');
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [task, setTask] = useState<'analyze' | 'explain' | 'optimize' | 'debug'>('analyze');

  const handleRunAnalysis = () => {
    if (!code.trim()) return;
    
    setLoading(true);
    setOutput(null);
    
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, this would call a Groq API endpoint for code analysis
      let result = '';
      
      if (task === 'analyze') {
        result = getCodeAnalysis(code, language);
      } else if (task === 'explain') {
        result = getCodeExplanation(code, language);
      } else if (task === 'optimize') {
        result = getCodeOptimization(code, language);
      } else if (task === 'debug') {
        result = getCodeDebugging(code, language);
      }
      
      setOutput(result);
      setLoading(false);
    }, 1500);
  };

  const getCodeAnalysis = (codeSnippet: string, lang: string): string => {
    // This is a mock implementation
    return `
# Code Analysis

## Overview
Your code is ${codeSnippet.split('\n').length} lines of ${lang.toUpperCase()} code.

## Structure
${language === 'javascript' || language === 'typescript' ? '- Contains function declarations: 1\n- Contains variable declarations: 2' : ''}
${language === 'python' ? '- Contains function definitions: 1\n- Contains variable assignments: 2' : ''}
${language === 'java' || language === 'c' || language === 'cpp' ? '- Contains class definitions: 1\n- Contains method declarations: 2' : ''}

## Potential Issues
- No major issues detected
- Consider adding more comments to explain your logic
- Ensure proper error handling for robust code
    `;
  };

  const getCodeExplanation = (codeSnippet: string, lang: string): string => {
    // This is a mock implementation
    return `
# Code Explanation

This ${lang.toUpperCase()} code appears to be ${
      language === 'javascript' || language === 'typescript' 
        ? 'a JavaScript function that processes data.'
        : language === 'python'
        ? 'a Python function that handles data manipulation.'
        : language === 'java'
        ? 'a Java class that implements data processing logic.'
        : 'code that implements some logic.'
    }

## Line-by-Line Explanation:
${codeSnippet.split('\n').slice(0, 3).map((line, i) => (
  `- Line ${i+1}: ${
    line.trim() === '' 
      ? 'Empty line for readability'
      : line.trim().startsWith('//') || line.trim().startsWith('#')
      ? 'Comment providing context'
      : 'Defines code structure or logic'
  }`
)).join('\n')}
...

## Purpose:
The code appears to be designed for data manipulation or processing tasks. It follows ${
  language === 'javascript' || language === 'typescript' 
    ? 'modern JavaScript conventions.'
    : language === 'python'
    ? 'Pythonic principles.'
    : language === 'java'
    ? 'object-oriented design patterns.'
    : 'standard programming practices.'
}
    `;
  };

  const getCodeOptimization = (codeSnippet: string, lang: string): string => {
    // This is a mock implementation
    return `
# Optimization Suggestions

## Performance Improvements
1. Consider using ${
  language === 'javascript' || language === 'typescript' 
    ? 'array methods like map/reduce instead of loops for better readability and potentially better performance.'
    : language === 'python'
    ? 'list comprehensions instead of explicit for loops for cleaner code.'
    : language === 'java'
    ? 'Java streams API for processing collections more efficiently.'
    : 'more efficient data structures for better time complexity.'
}

2. ${
  language === 'javascript' || language === 'typescript' 
    ? 'Avoid unnecessary DOM manipulations that cause reflows.'
    : language === 'python'
    ? 'Use generators for handling large datasets to conserve memory.'
    : language === 'java'
    ? 'Consider using StringBuilder for string concatenation operations.'
    : 'Optimize loops to reduce computational complexity.'
}

## Memory Optimization
- ${
  language === 'javascript' 
    ? 'Be mindful of closures that might lead to memory leaks.'
    : language === 'python'
    ? 'Use context managers (with statements) for proper resource management.'
    : language === 'java' || language === 'cpp'
    ? 'Ensure proper resource cleanup to prevent memory leaks.'
    : 'Manage memory efficiently to avoid leaks and excessive usage.'
}

## Code Structure
- Consider breaking down complex functions into smaller, reusable components
- Add appropriate error handling to make code more robust
    `;
  };

  const getCodeDebugging = (codeSnippet: string, lang: string): string => {
    // This is a mock implementation
    return `
# Debugging Analysis

## Potential Issues
1. ${
  language === 'javascript' || language === 'typescript' 
    ? 'Possible undefined variable access on line 3'
    : language === 'python'
    ? 'Potential indentation error that could cause unexpected behavior'
    : language === 'java'
    ? 'Missing null check before accessing object methods'
    : 'Possible logical error in condition statement'
}

2. ${
  language === 'javascript' || language === 'typescript' 
    ? 'Check for proper async/await usage to avoid race conditions'
    : language === 'python'
    ? 'Ensure exception handling covers all potential error cases'
    : language === 'java'
    ? 'Verify proper resource closing in try-with-resources blocks'
    : 'Review loop termination conditions for off-by-one errors'
}

## Recommendations
- Add console logging or debugging statements at key points
- Implement proper error handling with try/catch blocks
- Consider using a step-by-step debugger to trace execution flow
- Add unit tests to verify expected behavior
    `;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-green-600 text-white p-4">
            <h1 className="text-xl font-bold">Programming Tutor</h1>
            <p className="text-green-100">Get help with your code through AI-powered analysis</p>
          </div>

          <div className="p-4 flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/4">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Language</label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="c">C</option>
                  <option value="csharp">C#</option>
                  <option value="go">Go</option>
                  <option value="rust">Rust</option>
                  <option value="ruby">Ruby</option>
                  <option value="php">PHP</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Task</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      name="task" 
                      value="analyze" 
                      checked={task === 'analyze'} 
                      onChange={() => setTask('analyze')}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span>Analyze Code</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      name="task" 
                      value="explain" 
                      checked={task === 'explain'} 
                      onChange={() => setTask('explain')}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span>Explain Code</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      name="task" 
                      value="optimize" 
                      checked={task === 'optimize'} 
                      onChange={() => setTask('optimize')}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span>Optimize Code</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      name="task" 
                      value="debug" 
                      checked={task === 'debug'} 
                      onChange={() => setTask('debug')}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span>Debug Code</span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleRunAnalysis}
                disabled={!code.trim() || loading}
                className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                  !code.trim() || loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {loading ? 'Analyzing...' : `Run ${task.charAt(0).toUpperCase() + task.slice(1)}`}
              </button>
            </div>

            <div className="w-full md:w-3/4">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Your Code</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex justify-between items-center">
                    <span className="text-sm font-mono text-gray-600">{language.toUpperCase()}</span>
                    <button
                      onClick={() => setCode('// Type or paste your code here\n')}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Clear
                    </button>
                  </div>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-64 p-4 font-mono text-sm focus:outline-none"
                    placeholder="// Type or paste your code here"
                  ></textarea>
                </div>
              </div>

              {(loading || output) && (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Analysis Results</label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
                      <span className="text-sm font-mono text-gray-600">Output</span>
                    </div>
                    <div className="p-4 h-64 overflow-y-auto">
                      {loading ? (
                        <div className="flex items-center justify-center h-full">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full"
                          ></motion.div>
                          <span className="ml-2 text-gray-600">Analyzing your code...</span>
                        </div>
                      ) : (
                        <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">{output}</pre>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Expert Analysis"
            description="Get professional-level insights into your code structure, style, and potential issues."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
          />
          <FeatureCard
            title="Learning Resources"
            description="Access tailored tutorials and documentation based on your code patterns and mistakes."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          />
          <FeatureCard
            title="Real-Time Feedback"
            description="Instant suggestions for code improvements, best practices, and bug fixes as you type."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
        </div>
      </div>
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
      className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="text-green-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default ProgrammingTutorPage; 