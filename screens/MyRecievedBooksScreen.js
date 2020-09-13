import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, ScrollView, KeyboardAvoidingView, FlatList, SwipeableListView } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'
import {ListItem, Card, Icon} from 'react-native-elements'
import SwipeableFlatList from '../components/SwipeableFlatList'

export default class NotificationScreen extends Component{
    static navigationOptions={header:null};
    constructor(){
        super()
        this.state= {
            userId: firebase.auth().currentUser.email,
            recievedBooksList: []
        }

        this.requestRef= null
    }

    getRecievedBooksList= ()=>{
        this.requestRef= db.collection('requested_books').where('user_id', '==', this.state.userId)
        .where("book_status","==", 'recieved')
        .onSnapshot((snapshot)=>{
           var recievedBooksList= snapshot.docs.map((doc)=>{doc.data()}) 
            this.setState ({
              recievedBooksList: recievedBooksList
           })
        })
    }

    keyExtractor= (item,index)=>index.toString()

    renderItem= ({item,i})=>(
        <ListItem 
        key= {i}
        title= {item.book_name}
        leftElement= {<Icon name="book" type= "font-awesome" color="#696969" />}
        titleStyle= {{color: 'black', fontWeight: 'bold' }}
        subtitle= {item.message}
        bottomDivider
        />
    )

    componentDidMount(){
        this.getRecievedBooksList()
    }

    componentWillUnMount(){
        this.requestRef()
    }

    render(){
        return(
            <View style = {{flex: 1 }}>
                <MyHeader navigation= {this.props.navigation} title= "Recieved Books"/>
                <View style= {{flex: 1}}>
                    {
                        this.state.recievedBooksList.length===0
                        ?(
                            <View style= {{flex: 1, justifyContet: 'center', alignItems: 'center'}}>
                                <Text style= {{fontSize: 20}}>You Have No Notifications</Text>
                                </View>
                        ):(
                            <SwipeableFlatList allNotifications= {this.state.allNotifications}/>
                        )

                    }
                    </View> 
            </View>
        )
    }

}

const styles= StyleSheet.create({
    subtitle:{
        flex: 1,
        fontSize: 20,
        justifyContent:'center',
        alignItems:'center'
    },

    button:{
        width:200,
        height: 50,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "orange",
        shadowColor: "#000",
        ShadowOffset: {
        width:0,
        height:8
        },
        elevation: 16,
        
    },
})