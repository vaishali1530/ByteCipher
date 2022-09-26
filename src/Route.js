import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './component/Splash';


const Stack = createStackNavigator();
const Stacknav = (navigation) => {
  return (
    <Stack.Navigator initialRouteName={'Splash'}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false, gestureEnabled: false}}
      />   
    </Stack.Navigator>
  );
};
export default Stacknav;
