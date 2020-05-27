import React, { useContext, useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'

import Swiper from 'react-native-swiper'
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas'

import Context from '../context/GlobalContext'

export default function HomeScreen() {
  const sketchRef = useRef()
  const context = useContext(Context)

  const undo = () => {
    sketchRef.current.undo()
  }

  const clear = () => {
    sketchRef.current.clear()
  }

  const save = () => {
    sketchRef.current.save(
      'png',
      false,
      'RNSketchCanvas',
      String(Math.ceil(Math.random() * 100000000)),
      false,
      false,
      false
    )
  }

  return (
    <View style={styles.container}>
      <View style={[{ flex: 1 }, styles.innerContainer]}>
        <View style={styles.topButtonsRow}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => undo()}>
            <Ionicons
              style={{ flex: 1, textAlign: 'center' }}
              name='md-arrow-back'
              size={30}
              color='black'
            />
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 1 }} onPress={() => clear()}>
            <Ionicons
              style={{ flex: 1, textAlign: 'center' }}
              name='md-close'
              size={30}
              color='black'
            />
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 1 }} onPress={() => save()}>
            <Ionicons
              style={{ flex: 1, textAlign: 'center' }}
              name='md-checkmark'
              size={30}
              color='black'
            />
          </TouchableOpacity>
        </View>

        <SketchCanvas
          ref={sketchRef}
          style={{ flex: 1 }}
          strokeColor={'red'}
          strokeWidth={7}
          strokeColor='blue'
          onSketchSaved={(success, path) => {
            if (success) {
              context.uploadPhoto(path)

              Alert.alert(
                'Drawing saved!',
                'Image is being sent to the server',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: true }
              )
            }
          }}
        ></SketchCanvas>

        <View style={styles.bottomRow}>
          <Swiper style={styles.wrapper}>
            <View style={styles.slide1}>
              <Text style={styles.text}>Hello Swiper</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.text}>And simple</Text>
            </View>
          </Swiper>
        </View>
      </View>
    </View>
  )
}

HomeScreen.navigationOptions = {
  header: null,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  innerContainer: {},

  topButtonsRow: {
    marginTop: 20,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },

  bottomRow: {
    height: 200,
    backgroundColor: 'blue',
  },
})
