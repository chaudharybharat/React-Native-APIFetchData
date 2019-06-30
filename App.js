/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions,FlatList,ActivityIndicator,Platform,TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import CardView from 'react-native-cardview'
type Props = {};
  var test=""
  let {width, height} = Dimensions.get('window')
export default class App extends Component<Props> {
  state={
    loading: true,
    dataSource: [],
  }

  render(){
  if(this.state.loading){
   return(
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#000000"/>
    </View>
)}
return(
 <View style={styles.container}>
 <FlatList
 style={{margin:10}}
    data= {this.state.dataSource}
    ItemSeparatorComponent = {this.FlatListItemSeparator}
    renderItem= {item=> this.renderItem(item)}
    keyExtractor= {item=>item.id.toString()}
 />
</View>
)}
renderItem=(data)=>
<CardView
style={{margin:10,width:width-40,padding:15}}
         cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}>
<TouchableOpacity>
<Text>{data.item.company.name}</Text>
<Text>{data.item.email}</Text>
<Text>{data.item.name}</Text></TouchableOpacity>
</CardView>
  componentDidMount(){
    //Get APi
  fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then((responseJson)=> {
    this.setState({
     loading: false,
     dataSource: responseJson
    })
  })
  .catch(error=>console.log(error)) //to catch the errors if any
  }
  // Post ReactApiCall

  getDataUsingPost(){
    //POST json
    var dataToSend = {title: 'foo', body: 'bar', userId: 1};
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //POST request
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: "POST",//Request Type
      body: formBody,//post body
      headers: {//Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
    })
    .then((response) => response.json())
    //If response is in json then in success
    .then((responseJson) => {
        alert(JSON.stringify(responseJson));
        console.log(responseJson);
    })
    //If response is not in json then in error
    .catch((error) => {
      alert(JSON.stringify(error));
      console.error(error);
    });
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
   },

});
