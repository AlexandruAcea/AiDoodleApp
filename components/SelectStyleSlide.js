import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

const SelectStyleSlide = ({ selectStyle, data }) => {
  const [selected, setSelected] = useState(0)

  const select = (key) => {
    setSelected(key)
    selectStyle(data[key].name)
  }

  const renderList = () => {
    return data.map((item, key) => {
      return (
        <TouchableOpacity
          style={styles.container}
          key={key}
          onPress={() => select(key)}
        >
          <View
            style={[styles.halo, selected === key ? styles.haloSelected : null]}
          >
            <Image
              style={{ height: 100, width: 100, borderRadius: 100 }}
              source={item.image}
            ></Image>
          </View>
          <Text style={{ marginTop: 5 }}>{item.name}</Text>
        </TouchableOpacity>
      )
    })
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        marginTop: 50,
        paddingHorizontal: 50,
      }}
    >
      {renderList()}
    </View>
  )
}

export default SelectStyleSlide

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  halo: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 100,
    padding: 3,
  },

  haloSelected: {
    borderColor: 'black',
  },
})
