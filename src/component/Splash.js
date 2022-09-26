import React, { Component } from 'react';
import { View, Image,StatusBar } from 'react-native';
import Color from '../assets/colors'
import { mobileW, mobileH } from '../assets/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        const timer = setTimeout(() => {
            this.checkauthentication()
        }, 2000);
    }

    checkauthentication = async () => {
        let result = await AsyncStorage.getItem('user_arr');
        console.log('resultresult', result)
        result = JSON.parse(result);

        if (result == null) {
            this.props.navigation.navigate('Login')
        }
        else {
            this.props.navigation.navigate('Home')
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', 'justifyContent': 'center', backgroundColor: Color.splashback }}>
                 <StatusBar hidden={true}/>
                <Image source={require('../assets/images/download.png')} style={{ width: mobileW * 60 / 100, height: mobileW * 50 / 100, resizeMode: 'contain' }} />

            </View>
        );
    }
}
