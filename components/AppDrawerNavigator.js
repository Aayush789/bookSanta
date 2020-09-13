import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, ScrollView, KeyboardAvoidingView, FlatList } from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen'
import MyDonationScreen from '../screens/MyDonationScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MyRecievedBooksScreen from '../screens/MyRecievedBooksScreen'


export const AppDrawerNavigator= createDrawerNavigator({
    Home: {
        screen: AppTabNavigator
    },
    MyDonations: {
        screen: MyDonationScreen
    },
    Notification: {
        screen: NotificationScreen
    },

    MyRecievedBooks:{
        screen: MyRecievedBooksScreen
    },

    Setting:{
        screen:SettingScreen
    }
},
{
    contentComponent: CustomSideBarMenu
},
{ 
    initialRouteName: 'Home'


})
