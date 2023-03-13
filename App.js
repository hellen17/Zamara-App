import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MenuScreen from './components/Menu';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <>
    <NavigationContainer>
        <MenuScreen />
    </NavigationContainer>  
    </>


  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
});


