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

export default function SignUpScreen({ navigation }) {
  const context = useContext(Context)
  const { loggedIn } = context

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (loggedIn) {
    navigation.push('Root')
  }

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        > */}
        <View style={styles.subContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.labelStyle}>Email</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder='Email'
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <Text style={styles.labelStyle}>Password</Text>
            <TextInput
              style={styles.inputStyle}
              placeholder='Password'
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
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
                onPress={() => navigation.pop()}
              >
                <Text style={{ color: 'white' }}>Go Back</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, styles.buttonRight]}>
                <Text style={{ color: 'black' }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* </ScrollView> */}
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
    height: Dimensions.get('window').height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: -100,
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
})
