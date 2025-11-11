import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase/config';
import toast from 'react-hot-toast';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem('token', token);
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastLoginAt: user.metadata.lastLoginAt
        });
      } else {
        localStorage.removeItem('token');
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back to HomeHero!');
      return result;
    } catch (error) {
      toast.error(getAuthErrorMessage(error.code));
      throw error;
    }
  };

  const register = async (name, email, password, photoURL) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3B82F6&color=fff`
      });
      
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);
      
      toast.success('Account created successfully! Welcome to HomeHero!');
      return result;
    } catch (error) {
      toast.error(getAuthErrorMessage(error.code));
      throw error;
    }
  };

  const googleLogin = async () => {
    try {
      const { googleProvider } = await import('../firebase/config');
      const result = await signInWithPopup(auth, googleProvider);
      toast.success('Welcome to HomeHero!');
      return result;
    } catch (error) {
      toast.error(getAuthErrorMessage(error.code));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const updateUserProfile = async (updates) => {
    try {
      await updateProfile(auth.currentUser, updates);
      setUser({ ...auth.currentUser, ...updates });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
    } catch (error) {
      toast.error(getAuthErrorMessage(error.code));
      throw error;
    }
  };

  const getAuthErrorMessage = (errorCode) => {
    const messages = {
      'auth/invalid-email': 'Invalid email address',
      'auth/user-disabled': 'This account has been disabled',
      'auth/user-not-found': 'No account found with this email',
      'auth/wrong-password': 'Incorrect password',
      'auth/email-already-in-use': 'An account with this email already exists',
      'auth/weak-password': 'Password should be at least 6 characters',
      'auth/network-request-failed': 'Network error. Please check your connection',
      'auth/too-many-requests': 'Too many attempts. Please try again later.',
      'auth/operation-not-allowed': 'This operation is not allowed.',
      'auth/requires-recent-login': 'Please login again to perform this action.',
    };
    return messages[errorCode] || 'An error occurred. Please try again.';
  };

  const value = {
    user,
    login,
    register,
    googleLogin,
    logout,
    updateUserProfile,
    resetPassword,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the context itself for rare cases where it's needed directly
export { AuthContext };