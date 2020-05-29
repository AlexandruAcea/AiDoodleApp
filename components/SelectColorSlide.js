import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

const SelectColorSlide = ({ selectColor, data }) => {
  const [selected, setSelected] = useState(0)

  const select = (key) => {
    setSelected(key)
    selectColor(data[key].color)
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
            style={[
              styles.halo,
              selected === key ? styles.haloSelected : null,
              { backgroundColor: item.color },
            ]}
          >
            <View style={{ height: 50, width: 50, borderRadius: 100 }}></View>
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

export default SelectColorSlide

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },

  halo: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 100,
    padding: 2,
  },

  haloSelected: {
    borderColor: 'black',
  },
})
