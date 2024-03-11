import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import { View, StyleSheet, Text } from 'react-native';
import axios from 'axios';

const WelcomeScreen = () => {
  const {token} = useContext(AuthContext);
  const [fetchedMessage, setFetchedMessage] = useState('');
  useEffect(() => {
    // Hitting a protected route, must send token in query params
    axios
      .get(
        `https://react-native-authapp-1-default-rtdb.firebaseio.com/message.json?auth=${token}`
      )
      .then((response) => {
        setFetchedMessage(response.data);
      });
  }, [token]);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
};

export default WelcomeScreen;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  }
});
