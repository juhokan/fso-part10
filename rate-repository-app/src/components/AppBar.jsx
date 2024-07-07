import { View, StyleSheet, Pressable, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#24292e',
    flexDirection: 'row'
  }
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable>
          <AppBarTab name={'Repositories'} route={'/'}/>
        </Pressable>
        <Pressable>
          <AppBarTab name={'Sign In'} route={'/signin'}/>
        </Pressable>
      </ScrollView>
    </View>
  )
}

export default AppBar