import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MenuScreen from './components/Menu';

export default function App () {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <NavigationContainer>
        <MenuScreen loggedIn={loggedIn} handleLogout={handleLogout} />
 
    </NavigationContainer>
  );
};

