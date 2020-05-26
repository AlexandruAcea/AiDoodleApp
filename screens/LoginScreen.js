import React, { useContext, useState } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Context from '../context/GlobalContext'

export default function HomeScreen({ navigation }) {
  const context = useContext(Context)
  const { loggedIn, setConnLink } = context

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [link, setLink] = useState(context.link)

  if (loggedIn) {
    navigation.push('Root')
  }

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.subContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.labelStyle}>Email</Text>
              <TextInput
                style={styles.inputStyle}
                placeholder='Email'
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
              />

              <Text style={styles.labelStyle}>Password</Text>
              <TextInput
                style={styles.inputStyle}
                placeholder='Password'
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
              />

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={[styles.button, { marginRight: 10 }]}
                  onPress={() => navigation.push('SignUp')}
                >
                  <Text style={{ color: 'white' }}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.buttonRight]}
                  onPress={() => context.login(email, password)}
                >
                  <Text style={{ color: 'black' }}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.bottomStuff}>
            <TextInput
              style={{ marginBottom: 10 }}
              placeholder='link'
              value={link}
              onChangeText={(text) => setLink(text)}
            ></TextInput>
            <TouchableOpacity
              style={styles.setButton}
              onPress={() => context.setConnLink(link)}
            >
              <Text style={{ color: 'white' }}>Set</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  subContainer: {
    height: Dimensions.get('window').height - 90,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },

  labelStyle: {
    fontSize: 18,
    marginBottom: 7,
  },

  inputStyle: {
    marginBottom: 15,
    fontSize: 18,
  },

  buttons: {
    flexDirection: 'row',
    marginTop: 20,
  },

  button: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
  },

  buttonRight: {
    backgroundColor: 'white',
    paddingLeft: 10,
  },

  bottomStuff: {
    paddingHorizontal: 20,
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: 100,

    bottom: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },

  setButton: {
    height: 30,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 5,
  },
})
