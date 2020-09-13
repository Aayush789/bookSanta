import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, ScrollView, KeyboardAvoidingView, FlatList } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'
import {ListItem, Card, Icon} from 'react-native-elements'

export default class MyDonationScreen extends Component{
    static navigationOptions={header:null};
    constructor(){
        super()
        this.state= {
            userId: firebase.auth().currentUser.email,
            allDonations: []
        }

        this.requestRef= null
    }

    getAllDonations= ()=>{
        this.requestRef= db.collection('all_donations').where('donor_id', '==', this.state.userId)
        .onSnapshot((snapshot)=>{
            
            var allDonations= snapshot.docs.map(document=>document.data())
             this.setState ({
              allDonations: allDonations
           })
        })
    }

    keyExtractor= (item,index)=>index.toString()

    renderItem= ({item,i})=>(
        <ListItem 
        key= {i}
        title= {item.book_name}
        subtitle= {"requestedBy: "+ item.requested_by+"\nStatus: "+item.request_status}
        leftElement= {<Icon name="book" type= "font-awesome" color="#696969" />}
        titleStyle= {{color: 'black', fontWeight: 'bold' }}
        rightElement ={
            <TouchableOpacity style= {styles.button}>
                <Text style= {{color:'#fff'}}>Send Book</Text> 
            </TouchableOpacity>
        }
        bottomDivider
        />
    )

    componentDidMount(){
        this.getAllDonations()
    }

    componentWillUnMount(){
        this.requestRef()
    }

    render(){
        return(
            <View style = {{flex: 1 }}>
                <MyHeader navigation= {this.props.navigation} title= "myDonations"/>
                <View style= {{flex: 1}}>
                    {
                        this.state.allDonations.length===0
                        ?(
                            <View style= {styles.subtitle}>
                                <Text style= {{fontSize: 20}}>List of all book donations</Text>
                                </View>
                        ):(
                            <FlatList
                            keyExtractor= {this.keyExtractor}
                            data= {this.state.allDonations}
                            renderItem= {this.renderItem}
                            />
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