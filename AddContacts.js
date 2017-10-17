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

  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior = "padding">
      <View style={styles.formContainer}>
            <TextInput
              underlineColor="transparent"
              placeholder="Name"
              returnKeyType="next"
              onChangeText={(name) =>this.saveData(name)}
              style={styles.input}/>
            <TextInput
              underlineColor="transparent"
              placeholder="Number"
              keyboardType="phone-pad"
              returnKeyType="go"
              onChangeText={(number) => this.saveData(number)}
              style={styles.input}/>
              <Button
                  style={styles.buttonContainer}
                  onPress={() => navigate("Index")}
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

export default Screen ;
