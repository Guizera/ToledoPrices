import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ProductsProvider } from './context/ProductsContext';
import { AuthProvider } from './context/AuthContext';
import SplashScreen from './views/SplashScreen';
import LoginScreen from './views/LoginScreen';
import BottomTabs from './views/BottomTabs';
import RegisterScreen from './views/RegisterScreen';

export type RootStackParamList = {
  Splash: undefined;
  Main: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Main" component={BottomTabs} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </ProductsProvider>
    </AuthProvider>
  );
}