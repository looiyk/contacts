import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button, ListView } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { List, ListItem, CheckBox } from "react-native-elements";
import AddContacts from "./AddContacts.js";

const details = new ListView.DataSource ({rowHasChanged: (row1, row2) => row1 != row2});

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      /*dataSource: details.cloneWithRows([
        {
              name: "Peter Parker",
              number: "213123123213 "
            },
            {
              name: "May Parker",
              number: "213123123213 "
            },
            {
              name: "Harry Osbourne",
              number: "213123123213 "
            },
            {
              name: "Flint Marko",
              number: "213123123213 "
            },
            {
              name: "Mary Jane",
              number: "213123123213 "
            },
      ]),*/
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    }
  }

  renderRow (rowData, SectionID){
    return (
      <View style={styles.renderRow}>
        <Text>{rowData.name}</Text>
        <Text>{rowData.number}</Text>
      </View>
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
  console.log("gjjhvjhv");
  return (
    {phoneNumber}
  );
}

  render() {
   //data = [{}];
   console.log(this.state.data);
    return (
      <View style={{backgroundColor: 'brown', flex:1, marginTop: 10 }}>
        <Text style={{flex:1, color: "black", fontSize: 40}}>
          {this.state.data.map(person =>{this.displayNumbers(person.name)})}
        </Text>
      </View>

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
    marginTop: 5
  }
});

//<FlatList

/*  renderItem= {({item}) => (<ListView
      dataSource={item.phoneNumbers}
      renderRow={this.renderRow}/>)}

  keyExtractor={data=> data.phoneNumbers}
  ItemSeparatorComponent={this.renderSeparator}
  ListHeaderComponent={this.renderHeader}
  ListFooterComponent={this.renderFooter}
  onRefresh={this.handleRefresh}
  refreshing={this.state.refreshing}
  onEndReached={this.handleLoadMore}
  onEndReachedThreshold={50}*/
///>
