import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Demos from './components/demos'
import PilaScreen from './screens/PilaSrceen';
import DrawerScreen from './screens/DrawerScreen';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerScreen />
    </NavigationContainer>
  );
}

