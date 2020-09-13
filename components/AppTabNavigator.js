import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, ScrollView, KeyboardAvoidingView, FlatList, Image } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import BookDonateScreen from '../screens/BookDonateScreen';
import BookRequestScreen from '../screens/BookRequestScreen';
import {AppStackNavigator} from './AppStackNavigator'

export const AppTabNavigator = createBottomTabNavigator({
    DonateBooks: {
        screen: AppStackNavigator,
        navigationOptions: {
            tabBarLabel: "Donate Books" 
        } 
    },
    BookRequest: {
        screen: BookRequestScreen,
        navigationOptions: {
            tabBarLabel: "Book Request" 
        } 
    }
})

