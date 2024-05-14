import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationBancos from './bancos/Navigation/NavigationBancos';

const App = () => {

  return (
    <NavigationContainer>
      <NavigationBancos></NavigationBancos>
    </NavigationContainer>
  )
}

export default App;
