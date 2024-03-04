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
}

export async function createUser(email, password) {
  await authenticate('signUp', email, password);
}

export async function login(email, password) {
  await authenticate('signInWithPassword', email, password);
}
