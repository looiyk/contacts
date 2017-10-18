import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button, ListView, TouchableHighlight } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
//import { connect } from react-redux;
import configureStore from './store/ConfigureStore';
import { Ionicons } from '@expo/vector-icons';
import { List, ListItem, CheckBox } from "react-native-elements";
import AddContacts from "./component/AddContacts.js";
import Main from "./component/Main";
import {Provider} from 'react-redux';

const store = configureStore();
//const details = new ListView.DataSource ({rowHasChanged: (row1, row2) => row1 != row2});




const Route =  StackNavigator({
  Home: {
    screen: Main,
  },
  AddContacts: {
    screen: AddContacts,
  }
});

const App = ()=> (
  <Provider store={store}>
    <Route/>
  </Provider>
)


export default App;
