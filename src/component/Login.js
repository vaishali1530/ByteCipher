import React, { Component } from 'react';
import { View, Text, Image, TextInput, Keyboard, StatusBar, TouchableOpacity, StyleSheet, Alert, BackHandler } from 'react-native';
import Color from '../assets/colors'
import { mobileW, mobileH, Font } from '../assets/fonts';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default class Login extends Component {
    _didFocusSubscription;
    _willBlurSubscription;
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isSecurePassword: true,
            emailfocus: false,
            passfocus: false,
        };
        this._didFocusSubscription = props.navigation.addListener(
            'focus',
            payload =>
                BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
        );
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.setState({ email: '', password: '' })
        });
        this._willBlurSubscription = this.props.navigation.addListener(
            'blur',
            payload =>
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    this.handleBackPress,
                ),
        );
    }

    handleBackPress = () => {
        Alert.alert(
            'Exit App',
            'Are you sure ,you want to exit app?', [{
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'No',
            }, {
                text: 'Yes',
                onPress: () => BackHandler.exitApp()
            }], {
            cancelable: false
        }
        );
        return true;
    };

    loginbtn = () => {
        if (this.state.email.length <= 0 && this.state.password.length <= 0) {
            Toast.showWithGravity('Please enter the above fields(All fields are mandatory)', Toast.SHORT, Toast.CENTER)
            return false
        }
        if (this.state.email.length <= 0) {
            Toast.showWithGravity('Please enter your email', Toast.SHORT, Toast.CENTER)
            return false
        }
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (mailformat.test(this.state.email) == false) {
            Toast.showWithGravity('Please enter valid email', Toast.SHORT, Toast.CENTER)
            return false
        }


        if (this.state.password.length <= 0 || this.state.password.trim().length <= 0) {
            Toast.showWithGravity('Please enter password', Toast.SHORT, Toast.CENTER)
            return false
        }
        if (this.state.password.length < 6) {
            Toast.showWithGravity('Please enter minimum 6 characters password', Toast.SHORT, Toast.CENTER)
            return false
        }

        if (this.state.email != 'eve.holt@reqres.in') {
            Toast.showWithGravity('Entered email id is not registered with us', Toast.SHORT, Toast.CENTER)
            return false
        }

        if (this.state.password != 'cityslicka') {
            Toast.showWithGravity('Please enter correct password', Toast.SHORT, Toast.CENTER)
            return false
        }
        let uservalue = { email: this.state.email, password: this.state.password };
        uservalue = JSON.stringify(uservalue)
        let url = 'https://reqres.in/api/users?page=1'
        console.log(url)
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            data: uservalue
        }).then((response) => response.json())
            .then((obj) => {               
                AsyncStorage.setItem('user_detail', uservalue);
                this.props.navigation.navigate('Home')
            })
            .catch((error) => {
                console.log(error)
            });


    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <KeyboardAwareScrollView>

                    <StatusBar
                        hidden={false}
                        barStyle="dark-content"
                        backgroundColor={Color.statusbarcolor}
                        translucent={false}
                        networkActivityIndicatorVisible={true}
                    />
                    <View style={{ paddingVertical: mobileW * 2 / 100, alignItems: 'center', width: '100%', backgroundColor: Color.statusbarcolor }}>
                        <Text style={{ fontSize: mobileW * 5 / 100, fontWeight: 'bold', color: Color.theme_color }}>Login</Text>
                    </View>
                    <View style={{ width: '90%', marginTop: mobileW * 10 / 100, alignSelf: 'center' }}>

                        <View style={{ flexDirection: 'row', marginTop: mobileW * 5 / 100, alignSelf: 'center', marginBottom: mobileW * 3 / 100, width: '100%', borderWidth: 1, borderColor: Color.bordercolor, borderRadius: 5 }}>
                            <View style={{ width: '12%', alignSelf: 'center' }}>
                                <Image source={require('../assets/images/user-icon.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, resizeMode: 'contain', alignSelf: 'center' }} />
                            </View>
                            <TextInput
                                style={{ width: '85%', color: 'black' }}
                                placeholder={this.state.emailfocus == false ? 'Enter Email' : null}
                                placeholderTextColor={'black'}
                                onChangeText={(txt) => {
                                    this.setState({ email: txt }
                                    )
                                }}
                                keyboardType='email-address'
                                onFocus={() => { this.setState({ emailfocus: true }) }}
                                returnKeyLabel='done'
                                returnKeyType='done'
                                onSubmitEditing={() => { Keyboard.dismiss() }}

                            />
                            {this.state.emailfocus == true && <View style={{ position: 'absolute', top: -mobileW * 2.5 / 100, left: mobileW * 4 / 100 }}>
                                <Text style={{ backgroundColor: 'white', paddingHorizontal: mobileW * 2 / 100, borderRadius: 3, paddingVertical: mobileW * 0.2 / 100 }}>Enter Email</Text>
                            </View>}
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: mobileW * 5 / 100, alignSelf: 'center', marginBottom: mobileW * 3 / 100, width: '100%', borderWidth: 1, borderColor: Color.bordercolor, borderRadius: 5 }}>
                            <View style={{ width: '12%', alignSelf: 'center' }}>
                                <Image source={require('../assets/images/password-icon.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, resizeMode: 'contain', alignSelf: 'center' }} />
                            </View>

                            <TextInput
                                style={{ width: '73%', fontFamily: Font.fontbold, color: 'black' }}
                                placeholder={this.state.passfocus == false ? 'Enter Password' : null}
                                placeholderTextColor={'black'}
                                onChangeText={(txt) => {
                                    this.setState({ password: txt }
                                    )
                                }}
                                keyboardType='default'
                                onFocus={() => { this.setState({ passfocus: true }) }}
                                returnKeyLabel='done'
                                returnKeyType='done'
                                onSubmitEditing={() => { Keyboard.dismiss() }}
                                secureTextEntry={this.state.isSecurePassword}

                            />
                            {this.state.passfocus == true && <View style={{ position: 'absolute', top: -mobileW * 2.5 / 100, left: mobileW * 4 / 100 }}>
                                <Text style={{ backgroundColor: 'white', paddingHorizontal: mobileW * 2 / 100, borderRadius: 3, paddingVertical: mobileW * 0.2 / 100 }}>Enter Password</Text>
                            </View>}

                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        isSecurePassword: !this.state.isSecurePassword,
                                    });
                                }}
                                style={{
                                    alignSelf: 'center',
                                    position: 'absolute',
                                    justifyContent: 'center',
                                    right: 0,
                                    alignSelf: 'center',
                                    width: '15%'
                                }}>
                                {this.state.isSecurePassword ? (
                                    <Text
                                        style={{
                                            fontSize: (mobileW * 3) / 100,
                                            color: Color.theme_color,
                                            paddingRight: (mobileW * 2) / 100,
                                            fontFamily: Font.fontmedium,
                                            alignSelf: 'center',
                                        }}>Show
                                    </Text>
                                ) : (
                                    <Text
                                        style={{
                                            fontSize: (mobileW * 3) / 100,
                                            color: Color.theme_color,
                                            paddingRight: (mobileW * 2) / 100,
                                            fontFamily: Font.fontmedium,
                                            alignSelf: 'center',
                                        }}>
                                        Hide
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                width: '95%',
                                marginTop: (mobileW * 10) / 100,
                                alignSelf: 'center',
                            }}>
                            <TouchableOpacity
                                onPress={() => this.loginbtn()}
                                style={styles.buttonView1}>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontFamily: Font.fontbold,
                                        textAlign: 'center',
                                        color: Color.textwhite,
                                    }}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </KeyboardAwareScrollView>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    buttonView1: {
        width: '100%',
        borderRadius: (mobileW * 1) / 100,
        paddingVertical: (mobileW * 3.0) / 100,
        padding: (mobileW * 0.5) / 100,
        backgroundColor: Color.theme_color,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        shadowColor: Color.bordercolor,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
    },
    loginText: {
        fontSize: (mobileW * 5.5) / 100,
        color: '#000',
        fontFamily: Font.fontbold,
        textAlign: 'center',
    },
});