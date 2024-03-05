import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../utils/auth';
import { Alert } from 'react-native';

import LoadingOverlay from '../components/ui/LoadingOverlay';

const SignupScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signUpHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      await createUser(email, password);
      
    } catch (e) {
      Alert.alert('Authentication failed', 'Could not create user, please check your input and try again later')
      console.error(e)
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Creating User...' />;
  }
  return <AuthContent onAuthenticate={signUpHandler} />;
};

export default SignupScreen;
