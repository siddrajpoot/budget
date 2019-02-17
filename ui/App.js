import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      response: ''
    }
  }
  componentDidMount() {
    // fetch('http://localhost:3000/')
      // .then(response => response.json())
      // .then(json => this.setState(() => ({response: json})))
      // .then(json => console.log(json))
      // .catch(err => console.log(err))
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(json => this.setState({response: json.title}))
    fetch('http://192.168.1.34:3000/')
      .then(response => response.json())
      .then(json => this.setState(() => ({response: json.message})))
      .catch(err => console.log(err))
  } 

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.response}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40
  }
});
