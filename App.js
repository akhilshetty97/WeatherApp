import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Cities from './components/Cities';
import HomeScreen from './components/HomeScreen';
import DetailedReport from './components/DetailedReport';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DetailedReport" component={DetailedReport} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


