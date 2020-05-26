import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { Platform, StatusBar, StyleSheet, View, SafeAreaView } from 'react-native'

import BottomTabNavigator from './navigation/BottomTabNavigator'
import LinkingConfiguration from './navigation/LinkingConfiguration'

import SignUpScreen from './screens/SignUpScreen'
import LoginScreen from './screens/LoginScreen'

import { Provider } from './context/GlobalContext'

const Stack = createStackNavigator()

export default function App() {
	return (
		<Provider>
			<View style={styles.container}>
				{Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
				<SafeAreaView style={{ flex: 1 }}>
					<NavigationContainer linking={LinkingConfiguration}>
						<Stack.Navigator screenOptions={{ headerShown: false }}>
							<Stack.Screen name='Login' component={LoginScreen} />
							<Stack.Screen
								name='Root'
								component={BottomTabNavigator}
								options={{ gestureEnabled: false }}
							/>
							<Stack.Screen name='SignUp' component={SignUpScreen} />
						</Stack.Navigator>
					</NavigationContainer>
				</SafeAreaView>
			</View>
		</Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
})
