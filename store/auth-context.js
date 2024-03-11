import { createContext, useState, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {}
});

const initialState = {
  token: '',
  isAuthenticated: false
};


const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();

  const authenticate = (token) => {
    setAuthToken(token);
    // Need to store the token on the device so when the app is closed the user does not have login every time

    // args in seItem must be strings
    AsyncStorage.setItem('token', token);
  };

  const logout = () => {
    setAuthToken(null);
    AsyncStorage.removeItem('token');

  };

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
