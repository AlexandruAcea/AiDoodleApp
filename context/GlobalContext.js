import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import axios from 'axios'

const defaultState = {
  link: '',
  loggedIn: false,
  userToken: '',
  computations: [],

  login: () => {},
  signup: () => {},
  uploadPhoto: () => {},
  logout: () => {},
  setConnLink: () => {},
  test: () => {},
}

const Context = React.createContext(defaultState)

class Provider extends Component {
  state = {
    loggedIn: false,
    link: '',
    userToken: '',
    computations: [],
  }

  test = () => {
    const url = `${this.state.link}/test`

    axios
      .get(url)
      .then((res) => {
        console.log('hey', res.data)
        return res.data
      })
      .catch((error) => console.log(error))
  }

  setConnLink = (link) => {
    this.setState({ link: `http://${link}.ngrok.io` })
    this.setConnLinkToStorage(`http://${link}.ngrok.io`)
  }

  logout = () => {
    this.setState({ loggedIn: false })
    this.setDataToStorage({ loggedIn: false, userToken: '' })
  }

  login = (email, password) => {
    const url = `${this.state.link}/user/login`

    axios({
      method: 'post',
      url,
      headers: {},
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        this.setState({ loggedIn: true, userToken: res.data.token })

        this.setDataToStorage({ loggedIn: true, userToken: res.data.token })
      })
      .catch((error) => console.log(error))
  }

  signup = (email, password) => {}

  uploadPhoto = (path) => {
    console.log(path)
  }

  async setConnLinkToStorage(link) {
    try {
      await AsyncStorage.setItem('connLink', link)
    } catch (error) {
      console.log(error)
    }
  }

  async getConnLinkFromStorage() {
    try {
      const value = await AsyncStorage.getItem('connLink')
      if (value !== null) {
        this.setState({ link: value })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async setDataToStorage(object) {
    try {
      await AsyncStorage.setItem('loginDetails', JSON.stringify(object))
    } catch (error) {
      console.log(error)
    }
  }

  async getDataFromStorage() {
    try {
      const value = await AsyncStorage.getItem('loginDetails')
      if (value !== null) {
        const values = JSON.parse(value)
        this.setState({
          loggedIn: values.loggedIn,
          userToken: values.userToken,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.getDataFromStorage()
    this.getConnLinkFromStorage()
  }

  render() {
    const { children } = this.props

    return (
      <Context.Provider
        value={{
          ...this.state,
          login: this.login,
          signup: this.signup,
          uploadPhoto: this.uploadPhoto,
          logout: this.logout,
          setConnLink: this.setConnLink,
          test: this.test,
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}

export default Context

export { Provider }
