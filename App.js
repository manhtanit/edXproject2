import 'react-native-gesture-handler';
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";


import Movie from './screens/Movie'
import Search from './screens/Search'

const MainStack = () => {
  const Stack = createStackNavigator();
  return(
  <Stack.Navigator initialRouteName={'Search'}>
    <Stack.Screen name={'Movie'} component={Movie}/>
    <Stack.Screen name={'Search'} component={Search}/>
  </Stack.Navigator>
  )
}

export default class App extends React.Component {
  render() {
    return(
        <NavigationContainer>
          {<MainStack/>}
        </NavigationContainer>
    )
  }
}
