import { registerRootComponent } from 'expo';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import ProfilCusto from './components/Profil'
import Associations from './components/Associations'
import DetailsAssociation from './components/DetailsAssociation'
import Parameter from './components/Parameter'
import Hisotry from './components/Hisotry'
import SignIn from './components/SignIn';
import SignUpIndividual from './components/SignUpIndividual';
import SignUpAssociation from './components/SignUpAssociation';
import ForgotPassword from './components/ForgotPassword';
import Preference from './components/Preference';

const Drawer = createDrawerNavigator()
function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="SignIn" screenOptions={{ gestureEnabled: false}}>
        <Drawer.Screen name="SignIn" component={SignIn} />
        <Drawer.Screen name="SignUpIndividual" component={SignUpIndividual} />
        <Drawer.Screen name="SignUpAssociation" component={SignUpAssociation} />
        <Drawer.Screen name="ForgotPassword" component={ForgotPassword} />
        <Drawer.Screen name="Preference" component={Preference} />
        <Drawer.Screen name="ProfilCusto" component={ProfilCusto} />
        <Drawer.Screen name="Associations" component={Associations} />
        <Drawer.Screen name="DetailsAssociation" component={DetailsAssociation} />
        <Drawer.Screen name="Parameter" component={Parameter} />
        <Drawer.Screen name="History" component={Hisotry} />


      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App)