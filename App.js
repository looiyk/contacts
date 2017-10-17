import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button, ListView, TouchableHighlight } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
//import { connect } from react-redux;
import { Ionicons } from '@expo/vector-icons';
import { List, ListItem, CheckBox } from "react-native-elements";
import AddContacts from "./AddContacts.js";

//const details = new ListView.DataSource ({rowHasChanged: (row1, row2) => row1 != row2});
var realsuperheroes = [{name:"Batman", sex:"male"},{name:"Batman", sex:"male"}, {name:"Batman", sex:"male"}, {name:"Batman", sex:"male"}];
export class App extends React.Component {
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2});
    this.state = {
      dataSource: dataSource.cloneWithRows(realsuperheroes),
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    }
  }

  renderRow (rowData, sectionID, rowID){
    return (
      <TouchableHighlight underlayColor= "#dddddd" style={{height:44}}>
        <View>
          <Text style={{fontSize:20, color: "#000000"}} numberOfLines={1}>{rowData.name}</Text>
          <Text style={{fontSize:15, color: "#000000"}} numberOfLines={1}>{rowData.sex}</Text>
          <View style={{height:1, backgroundColor: "#dddddd"}}/>
        </View>
      </TouchableHighlight>
    );
  }

  static navigationOptions = {
    title: 'Contact Lists'
  };

  handlePress =() => {
    this.props.navigation.navigate('newscreen');
  }

  renderHeader = () => {
    const { navigate } = this.props.navigation;
    return (
      <Button
          style={styles.buttonContainer}
          onPress={() => navigate("AddContacts")}
          title="Add Contacts"/>
    );
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderFooter = () => {
    //if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  componentDidMount(){
    this.showContactListAsync().then(response => this.setState({data: response.data}));
    this.makeRemoteRequest();
  }

makeRemoteRequest(){
  const {page, seed} = this.state;

}
async showContactListAsync() {
  // Ask for permission to query contacts.
  const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
  if (permission.status !== 'granted') {
    // Permission was denied...
    return;
  }
  const contacts = await Expo.Contacts.getContactsAsync({
    fields: [
      Expo.Contacts.PHONE_NUMBERS
    ],
    pageSize: 10,
    pageOffset: 0,
  });
  return contacts;
}

displayNumbers = (phoneNumber) => {
  console.log(phoneNumber);

  return (
    <Text>
    {phoneNumber}
    </Text>
  );
}

  render() {
   console.log(this.state.data);
    return (

      <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}>

      </ListView>
      /*<FlatList
        data = {this.state.dataSource}
          renderItem = {({item})=>(
            <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}>

            </ListView>
          )}
          keyExtractor={data=> data.phoneNumbers}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
*/
      /*<View style={{backgroundColor: 'brown', flex:1, marginTop: 10 }}>
          {this.state.data.map(person => this.displayNumbers(person.name))}
      </View>*/

      /*<List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>


      </List>*/
    );
  }
}



export default StackNavigator({
  Home: {
    screen: App,
  },
  AddContacts: {
    screen: AddContacts,
  }
});



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#10A3D6'
  },
  renderRow: {
    borderWidth: 2,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center"
  }
});
