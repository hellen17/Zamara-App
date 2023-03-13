import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ContinentScreen from '../screens/ContinentScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LoginScreen from '../screens/LoginScreen';
import StaffScreen from '../screens/StaffScreen';


const Drawer = createDrawerNavigator();

const MenuScreen = () => {
  return (
    <Drawer.Navigator initialRouteName="Login">
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Continent" component={ContinentScreen} />
      <Drawer.Screen name="Staff" component={StaffScreen} />
    </Drawer.Navigator>
  );
};

export default MenuScreen;