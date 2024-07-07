import React from 'react'
import { Text, View } from 'react-native'
import { Link } from 'react-router-native'

const AppBarTab = ({ name, route }) => {
  return (
    <View style={{padding: 8}}>
      <Link to={route}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 600 }}>
          {name}
        </Text>
      </Link>
    </View>
  )
}

export default AppBarTab