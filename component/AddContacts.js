import React from 'react';
import {
  Text,
  Button,
  Platform,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView,
} from 'react-native';
import {
  FormLabel,
  FormInput
} from 'react-native-elements'
import {StackNavigator} from 'react-navigation'
import { connect } from 'react-redux';
//import textChanged from './Actions';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/UserAction';

class Screen extends React.Component {
  static navigationOptions = {
      title: 'Add Contacts',
  }
  componentDidMount(){
    AsyncStorage.getItem("myKey").then ((value) =>{
      this.setState({"myKey": value});
    }).done();
  }

  saveData(name, number){
    AsyncStorage.setItem("Name", name);
    this.setState({"Name": name})
    AsyncStorage.setItem("Number", number);
    this.setState({"Number": number})
  }

  saveDataTest = () => {
      let obj = {
        name: this.state.name,
        number: this.state.number
      }

      console.log('gettigng previous', this.props.user)
      let previousUser = [...this.props.user, obj];
      this.props.action.textChange(previousUser).then(data => {
          const { navigate } = this.props.navigation;
          navigate("Home")
      })

  }

  onChangeName = (value) => {
      this.setState({name: value})
  }

  onChangeNumber = (value)=> {
        this.setState({number: value})
  }


  render() {

    return (
      <KeyboardAvoidingView behavior = "padding">
      <View style={styles.formContainer}>
            <TextInput
              underlineColor="transparent"
              placeholder="Name"
              returnKeyType="next"
              onChangeText={this.onChangeName}
              style={styles.input}/>
            <TextInput
              underlineColor="transparent"
              placeholder="Number"
              keyboardType="phone-pad"
              returnKeyType="go"
              onChangeText={this.onChangeNumber}
              style={styles.input}/>
              <Button
                  style={styles.buttonContainer}
                  onPress={this.saveDataTest}
                  title="Add Contacts"
                />
      </View>
    </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '500',
  },
  formContainer: {
  padding:20,
  backgroundColor:"#97746C"

  },
  input: {
    height: 40,
    backgroundColor: "rgba(190,236,228,0.2)",
    marginBottom: 20,
    color: '#FFF',
    paddingHorizontal: 10
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(Screen) ;
//export default connect(null, textChanged)(CustomTextInput);
