import { useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import AuthContent from '../components/Auth/AuthContent';
import { login } from '../utils/auth';


const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    await login(email, password);
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Logging in...' />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};
export default LoginScreen;
