import axios from 'axios';
import { REACT_APP_API_KEY } from 'react-native-dotenv';

const BASE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${REACT_APP_API_KEY}`;

export async function createUser(email, password) {
  const response = await axios.post(`${BASE_URL}`, {
    email: email,
    password: password,
    returnSecureToken: true
  });
}
