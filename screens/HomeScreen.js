import React, { useContext, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'

import Swiper from 'react-native-swiper'
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas'
import Slider from '@react-native-community/slider'

import Context from '../context/GlobalContext'
import SelectStyleSlide from '../components/SelectStyleSlide'
import SelectColorSlide from '../components/SelectColorSlide'

import Renoir from '../assets/images/Renoir.jpg'
import Monet from '../assets/images/Monet.jpg'

const data = [
  {
    name: 'Renoir',
    image: Renoir,
    colors: [
      { name: 'Water', color: '#3498db' },
      { name: 'Grass', color: '#2ecc71' },
      { name: 'Trees', color: '#e74c3c' },
    ],
  },
  {
    name: 'Monet',
    image: Monet,
    colors: [
      { name: 'Water', color: '#3498db' },
      { name: 'Grass', color: '#2ecc71' },
      { name: 'Rocks', color: '#e74c3c' },
      { name: 'Dark Rocks', color: '#c0392b' },
    ],
  },
]

export default function HomeScreen() {
  const sketchRef = useRef()
  const context = useContext(Context)

  const [style, setStyle] = useState('Renoir')
  const [color, setColor] = useState('#3498db')
  const [colors, setColors] = useState(data[0].colors)
  const [hasStarted, setHasStarted] = useState(false)

  const [brushWidth, setBrushWidth] = useState(10)

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

  const selectStyle = (styleName) => {
    setStyle(style)
    if (styleName === 'Renoir') {
      setColors(data[0].colors)
    } else setColors(data[1].colors)
  }

  const selectColor = (color) => {
    setColor(color)
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

        <View style={{ flex: 1, padding: 10 }}>
          {!hasStarted && (
            <Text
              style={{
                position: 'absolute',
                left: '27%',
                width: 200,
                textAlign: 'center',
                marginTop: 220,
              }}
            >
              Hello, Start drawing something and see the magic happen
            </Text>
          )}
          <SketchCanvas
            onStrokeStart={() => setHasStarted(true)}
            ref={sketchRef}
            style={{ flex: 1, borderWidth: 2, borderColor: 'black' }}
            strokeWidth={brushWidth}
            strokeColor={color}
            onSketchSaved={(success, path) => {
              if (success) {
                context.uploadPhoto(path)
              }
            }}
          ></SketchCanvas>
        </View>

        <View style={styles.bottomRow}>
          <Swiper
            style={styles.wrapper}
            loop={false}
            index={0}
            paginationStyle={styles.pagination}
          >
            <View style={styles.slide}>
              <Text style={styles.text}>Select Style</Text>
              <SelectStyleSlide
                selectStyle={selectStyle}
                data={data}
              ></SelectStyleSlide>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>Select Brush Color</Text>
              <SelectColorSlide
                selectColor={selectColor}
                data={colors}
              ></SelectColorSlide>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>Brush Size</Text>
              <Slider
                style={{ width: 300, height: 70, marginTop: -20 }}
                minimumValue={10}
                maximumValue={70}
                minimumTrackTintColor={color}
                maximumTrackTintColor='#000000'
                onValueChange={(value) => setBrushWidth(value)}
              />
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
    height: 220,
  },

  pagination: {
    marginBottom: -15,
  },

  text: {
    position: 'absolute',
    top: 15,
    flex: 1,
    textAlign: 'center',
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
