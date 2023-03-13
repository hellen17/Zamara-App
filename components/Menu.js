import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useRoute } from '@react-navigation/native';
import ContinentScreen from '../screens/ContinentScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LoginScreen from '../screens/LoginScreen';
import StaffScreen from '../screens/StaffScreen';


const Drawer = createDrawerNavigator();

const MenuScreen =({loggedIn, handleLogout}) => {

  return (
    <Drawer.Navigator initialRouteName="Login" screenOptions={{ drawerActiveTintColor: '#43AE37' }} >
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Home" component={DashboardScreen} options={{ headerTitle: 'Zamara App' }} initialParams={{ username: '', firstname: ''}} />
      <Drawer.Screen name="Staff" component={StaffScreen} />
      <Drawer.Screen name="Continent" component={ContinentScreen} />
      <Drawer.Screen name="Sign Out" component={LoginScreen} onPress={handleLogout} />
    </Drawer.Navigator>
  );
};

export default MenuScreen;