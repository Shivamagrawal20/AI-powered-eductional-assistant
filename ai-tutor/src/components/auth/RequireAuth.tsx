import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from './AuthModal';

// This is a higher-order component (HOC) that can be used to wrap any component
// that requires authentication
const withRequireAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  // Return a new component
  const WithRequireAuth: React.FC<P> = (props) => {
    const { isAuthenticated } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
      // Check if the user is authenticated
      if (!isAuthenticated) {
        // Show auth modal instead of immediately redirecting
        setShowAuthModal(true);
      }
    }, [isAuthenticated]);
    
    // Close the modal and redirect to login
    const handleClose = () => {
      setShowAuthModal(false);
      navigate('/login');
    };
    
    // If authenticated, render the wrapped component
    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }
    
    // Otherwise render a placeholder with the auth modal
    return (
      <>
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-4">You need to be logged in to access this page.</p>
          </div>
        </div>
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={handleClose}
          message="Please log in or sign up to access this feature."
        />
      </>
    );
  };
  
  return WithRequireAuth;
};

export default withRequireAuth; 