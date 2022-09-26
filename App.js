import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Stacknav from './src/Route'
import { SafeAreaView, StatusBar } from 'react-native'
import Color from './src/assets/colors'

class App extends Component {

  render() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar hidden={false} backgroundColor={Color.theme_color} translucent={false}
            networkActivityIndicatorVisible={true} />
          <NavigationContainer>
            <Stacknav />
          </NavigationContainer>
        </SafeAreaView>
    );
  }
}

export default App;
