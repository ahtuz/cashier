import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PointOfSale from '../pages/PointOfSale';
import CheckOut from '../pages/CheckOut';
import CameraPage from '../pages/CameraPage';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PointOfSale" component={PointOfSale} options={{headerShown: false}} />
        <Stack.Screen name="CameraPage" component={CameraPage} options={{headerShown: false}}/>
        <Stack.Screen name="CheckOut" component={CheckOut} options={{title: "Pembayaran"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;