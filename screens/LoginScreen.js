import { useState, useContext } from 'react';
import { Alert } from 'react-native';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import AuthContent from '../components/Auth/AuthContent';
import { login } from '../utils/auth';
import { AuthContext } from '../store/auth-context';

const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
const authCtx = useContext(AuthContext)
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token)
    } catch (e) {
      Alert.alert('Authentication Failed!', "Could not log you in. Please check your credentials" )
      console.error(e);
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Logging in...' />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};
export default LoginScreen;
