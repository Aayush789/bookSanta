import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, ScrollView, KeyboardAvoidingView, FlatList, SwipeableListView } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'
import {ListItem, Card, Icon} from 'react-native-elements'
import SwipeableFlatList from '../components/SwipeableFlatList'

export default class NotificationScreen extends Component{
    static navigationOptions={header:null};
    constructor(props){
        super(props)
        this.state= {
            userId: firebase.auth().currentUser.email,
            allNotifications: []
        }

        this.notificationRef= null
    }

    getNotifications= ()=>{
        this.notificationRef= db.collection('all_notifications').where('notification_status', '==', "unread")
        .where("targeted_user_id","==", this.state.userId)
        .onSnapshot((snapshot)=>{
            var allNotifications= []
            snapshot.docs.map((doc)=>{
                var notification= doc.data()
                notification["doc_id"]=doc.id
                allNotifications.push(notification)
            })
            
            this.setState ({
              allNotifications: allNotifications
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
        this.getNotifications()
    }

    componentWillUnMount(){
        this.notificationRef()
    }

    render(){
        return(
            <View style = {{flex: 1 }}>
                <MyHeader navigation= {this.props.navigation} title= "Notifications"/>
                <View style= {{flex: 1}}>
                    {
                        this.state.allNotifications.length===0
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