import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, ScrollView, KeyboardAvoidingView, FlatList, Image } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import BookDonateScreen from '../screens/BookDonateScreen';
import BookRequestScreen from '../screens/BookRequestScreen';
import RecieverDetailsScreen from '../screens/RecieverDetailsScreen';
import {createStackNavigator} from 'react-navigation-stack'

export const AppStackNavigator = createStackNavigator({
    BookDonateList: {
        screen: BookDonateScreen,
        navigationOptions: {
            headerShown: false 
        } 
    },
    RecieverDetails: {
        screen: RecieverDetailsScreen,
        navigationOptions: {
        headerShown: false 
        } 
    }
},
{
    initialRouteName: 'BookDonateList'
})

