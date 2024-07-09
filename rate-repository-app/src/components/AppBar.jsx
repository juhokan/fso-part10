import { View, StyleSheet, Pressable, ScrollView, Text } from 'react-native'
import Constants from 'expo-constants'
import AppBarTab from './AppBarTab'
import useMe from '../hooks/useMe'
import useAuthStorage from '../hooks/useAuthStorage'
import { useApolloClient } from '@apollo/client'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#24292e',
    flexDirection: 'row'
  }
})

const AppBar = () => {
  const { me } = useMe()

  console.log(me)

  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const onSignOut = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
  }
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable>
          <AppBarTab name={'Repositories'} route={'/'}/>
        </Pressable>
        {me 
          ? (
            <Pressable onPress={onSignOut} style={{padding: 8}}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 600 }}>Sign Out</Text>
            </Pressable>
          ) : (
            <Pressable>
              <AppBarTab name={'Sign In'} route={'/signin'}/>
            </Pressable>
          )}
      </ScrollView>
    </View>
  )
}

export default AppBar