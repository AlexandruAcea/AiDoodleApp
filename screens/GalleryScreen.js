import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ScrollView,
} from 'react-native'
import Context from '../context/GlobalContext'

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

export default function GalleryScreen() {
  const context = useContext(Context)
  const link = context.link

  const [refreshing, setRefreshing] = React.useState(false)
  const [computations, setComputations] = useState([])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => setRefreshing(false))
  }, [refreshing])

  const getComputations = () => {
    const url = `${link}/user/myComps`
    axios
      .get(url, {
        headers: {
          token: context.userToken,
        },
      })
      .then((res) => {
        const list = res.data.reverse()
        setComputations(list)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getComputations()
  }, [])

  console.log(computations)

  const renderComputations = () => {
    return computations.map((computation, key) => {
      const imageUri = `${link}/img/${computation.user.username}/${computation._id}/results/Photo.png`
      return (
        <TouchableOpacity
          key={key}
          style={styles.imageContainer}
          // onPress={() => CameraRoll.saveToCameraRoll('photo', imageUri)}
        >
          <Image
            style={{ width: '100%', height: 420 }}
            source={{
              uri: imageUri,
            }}
          ></Image>
        </TouchableOpacity>
      )
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.gallery}>
        <Text style={{ fontSize: 18, marginTop: 10 }}>Gallery</Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderComputations()}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  imageContainer: {
    flex: 1,
    borderWidth: 2,
    marginHorizontal: 8,
    borderColor: 'black',
    marginBottom: 20,
  },

  gallery: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    backgroundColor: 'white',
  },
})
