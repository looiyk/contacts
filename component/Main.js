import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button, ListView, TouchableHighlight } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { List, ListItem} from "react-native-elements";
import AddContacts from "./AddContacts.js";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/UserAction';
import CheckBox from 'react-native-checkbox';

//let realsuperheroes = [{name:"Batman", sex:"male"},{name:"Batman", sex:"male"}, {name:"Batman", sex:"male"}, {name:"Batman", sex:"male"}];


 class Main extends React.Component {
  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 != r2});
    this.state = {
      loading: false,
      data: this.props.user,
      page: 1,
      seed: 1,
      value: false,
      error: null,
      refreshing: false
    }
  }
    static navigationOptions = {
      title: 'Contact Lists'
    };

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
    if (!this.state.loading) return null;
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
    console.log('I was rendered')
    this.showContactListAsync().then( response => {
        console.log(response.data)
      let contacts = response.data;
      if(this.state.data.length >= 1) {
        return;
      }else{
        console.log('state is empty');
        this.props.action.textChange(contacts).then(data => {
          console.log('Hello');
        })
    }

    })



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
    pageSize: 20,
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

change = () => {
  console.log('asked to change')
  this.setState({value: true});
}

  render() {

    return (
/*
      <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}>

      </ListView>*/

      <FlatList
          data={this.state.data}
          renderItem={({item}) =>
          <View style={{flex: 1}}>
            <Text>{ item.name}</Text>
            <View style={{flexDirection: 'row', flex: 1}}>
            <Text>{(item.number) ? item.number: item.phoneNumbers[0].number }</Text>
            <CheckBox
                checked={this.state.checked}
                label = ""
                onPress={() => this.setState({ checked: !this.state.checked })}
        />
            </View>
          </View>

       }
       keyExtractor={data=> data.number || data.phoneNumbers[0].number }
       ListHeaderComponent={this.renderHeader}
      ListFooterComponent={this.renderFooter}
      onRefresh={this.handleRefresh}
      refreshing={this.state.refreshing}
      onEndReached={this.handleLoadMore}
      onEndReachedThreshold={50}/>
    /*  <FlatList
        data = {this.state.data}
          renderItem = {({item})=>(
            <ListView dataSource={this.state.data} renderRow={this.renderRow.bind(this)}>

            </ListView>
          )}

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

      /*<List containerStyle={{
      : 0, borderBottomWidth: 0 }}>


      </List>*/
    );
  }
}

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

function mapStateToProps(state, ownProps){
  return {
    user: state.user.name
  }
}

function mapDispatchToProps(dispatch){
  return {
    action: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
