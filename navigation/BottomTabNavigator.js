import React, { useContext, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import GalleryScreen from '../screens/GalleryScreen'

import Context from '../context/GlobalContext'

const BottomTab = createBottomTabNavigator()
const INITIAL_ROUTE_NAME = 'Home'

export default function BottomTabNavigator({ navigation }) {
  const context = useContext(Context)

  //   const link = context.link

  //   useEffect(() => {
  //     if (link !== '') {
  //       const data = context.test()
  //       console.log(data)
  //       if (typeof data !== 'undefined')
  //         if (data.status) {
  //           //   navigation.pop()
  //           console.log('heyyyyy :(')
  //         }
  //     }
  //   }, [link])

  if (!context.loggedIn) {
    navigation.pop()
  }

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name='Links'
        component={GalleryScreen}
        options={{
          title: () => {
            return null
          },
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-home' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: () => {
            return null
          },
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-create' />
          ),
        }}
      />

      <BottomTab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          title: () => {
            return null
          },
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-settings' />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}
