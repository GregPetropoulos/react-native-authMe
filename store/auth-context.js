import { createContext, useState, useReducer } from 'react';

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

// const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN':
//       return state;

//     default:
//       break;
//   }
// };

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();
  //   const [authState, dispatch] = useReducer(authReducer, initialState);
  const authenticate = (token) => {
    setAuthToken(token);
  };

  const logout = () => {
    setAuthToken(null);
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
