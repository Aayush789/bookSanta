import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, ScrollView, KeyboardAvoidingView, FlatList } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'
import {ListItem} from 'react-native-elements'

export default class BookDonateScreen extends Component{
    constructor(){
        super()
        this.state= {
            requestedBooksList: []
        }
        this.requestRef = null
    }

    getRequestedBooksList= ()=>{
        this.requestRef= db.collection("requested_books")
        .onSnapshot((snapshot)=>{
            var requestedBooksList= snapshot.docs.map(document=>document.data());
            this.setState({
                requestedBooksList: requestedBooksList
            })
        })
    }
    componentDidMount(){
        this.getRequestedBooksList()
    }

    componentWillUnMount(){this.requestRef()}
    keyExtractor= (item,index)=>index.toString()

    renderItem= ({item,i})=>{
        return(
            <ListItem
            key= {i}
            title= {item.book_name}
            subtitle= {item.reason_to_request}
            titleStyle= {{color: 'black', fontWeighth: 'bold'}} 
            rightElement= {
                <TouchableOpacity style={styles.button}
                onPress={()=>{
                    this.props.navigation.navigate("RecieverDetails", {"details": item})
                }}
                >
                    <Text style= {{color: '#ffff'}}>View</Text>
                </TouchableOpacity>
            }
            bottomDivider
            /> 
        )
    }

    render(){
        return(
            <View style= {{flex: 1}}>
                <MyHeader title= "donate books" navigation= {this.props.navigation}/>
                <View style= {{flex: 1}}>
                    {
                        this.state.requestedBooksList.length===0
                        ?(
                            <View style= {styles.subContainer}>
                                <Text style = {{fontSize: 20}}>List Of All Requested Books</Text>
                                </View>

                        ): (
                            <FlatList 
                            keyExtractor= {this.keyExtractor}
                            data= {this.state.requestedBooksList}
                            renderItem={this.renderItem}/>
                        )


                        
                    }
                </View>
            </View>
        )

    }
    
}

const styles = StyleSheet.create({
    subContainer:{
        flex:1,
        justyfyContent: 'center',
        fontSize: 20,
        alignItems: 'center'  
    },

    button:{
        width:100,
        height: 30,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: "#ff9800",
        shadowColor: "#000",
        ShadowOffset: {
        width:0,
        height:8
        },
    },
})