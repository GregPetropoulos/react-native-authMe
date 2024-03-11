import { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignupScreen from './screens/SignupScreen';
import IconButton from './components/ui/IconButton';
import AuthContextProvider from './store/auth-context';
import { AuthContext } from './store/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from './constants/styles';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 }
      }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 }
      }}>
      <Stack.Screen
        name='Welcome'
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              color={tintColor}
              icon='exit'
              size={24}
              onPress={authCtx.logout}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
};
const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

// Because of auth stored token on device and needing access to the context, need to create a Root component
const Root = () => {
  const [appIsReady, setAppIsReady] = useState(true);
  const { authenticate } = useContext(AuthContext);

  useEffect(() => {
    const fetchToken = async () => {
      // Getting stored token form storage for auto logging a user if the app is re-opened
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        authenticate(storedToken);
      }
      setAppIsReady(false);
      await SplashScreen.hideAsync();
    };
    fetchToken();
  }, []);

  if (appIsReady) {
    return null;
  }

  return <Navigation />;
};

export default function App() {
  return (
    <>
      <StatusBar status='light' />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
