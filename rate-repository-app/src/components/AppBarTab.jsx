import React from 'react'
import { Text, View } from 'react-native'

const AppBarTab = ({ name }) => {
  return (
    <View style={{padding: 8}}>
      <Text style={{color: 'white', fontSize: 16, fontWeight: 600 }}>
        {name}
      </Text>
    </View>
  )
}

export default AppBarTab