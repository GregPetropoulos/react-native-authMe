import axios from 'axios';
import { REACT_APP_API_KEY } from 'react-native-dotenv';

const BASE_URL = `https://identitytoolkit.googleapis.com/v1/accounts`;

export async function authenticate(mode, email, password) {
  const url = `${BASE_URL}:${mode}?key=${REACT_APP_API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true
  });

  const token = response.data.idToken;
  return token;
}

export  function createUser(email, password) {
    // No need async await this will return as token
  return authenticate('signUp', email, password);

}

export function login(email, password) {
    return authenticate('signInWithPassword', email, password);
}
