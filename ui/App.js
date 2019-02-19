import React from 'react'
import {
  StyleSheet, Text, View, AsyncStorage,
} from 'react-native'
import PlaidAuthenticator from 'react-native-plaid-link'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      response: '',
      status: '',
    }
  }

  async componentDidMount() {
    const public_token = await AsyncStorage.getItem('public_token')

    if (public_token) {
      fetch('http://192.168.1.34:3000/get_access_token', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_token }),
      })
        .then(response => response.json())
        .then(json => console.log(json))
    }
  }

  onMessage = async (data) => {
    const status = data.action
      .substr(data.action.lastIndexOf(':') + 1)
      .toUpperCase()

    if (data.metadata) {
      const { public_token } = data.metadata

      if (public_token) {
        await AsyncStorage.setItem('public_token', public_token)
      }
    }

    // this.setState(() => ({
    //   data,
    //   status,
    // }))
  }

  renderLink() {
    return (
      <PlaidAuthenticator
        onMessage={this.onMessage}
        publicKey="ba59e5b554fed4ac74c9f2a5946c3e"
        env="development"
        product="auth,transactions"
        useWebKit
      />
    )
  }

  render() {
    const { status } = this.state
    switch (status) {
      default:
        return this.renderLink()
    }
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
    fontSize: 40,
  },
})
