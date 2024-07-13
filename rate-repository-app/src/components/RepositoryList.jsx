import React, { useState } from 'react'
import { FlatList, View, StyleSheet, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Link } from 'react-router-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  container: {
    padding: 10,
    backgroundColor: 'white'
  }
})

const OrderSelector = ({ orderBy, setOrderBy, orderDirection, setOrderDirection }) => {
  const handleChange = (itemValue) => {
    const [newOrderBy1, newOrderBy2, newOrderDirection] = itemValue.split('_')
    setOrderBy(`${newOrderBy1}_${newOrderBy2}`)
    setOrderDirection(newOrderDirection)
  }

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={`${orderBy}_${orderDirection}`}
        onValueChange={handleChange}
      >
        <Picker.Item label='Latest repositories' value='CREATED_AT_DESC' />
        <Picker.Item label='Highest rated repositories' value='RATING_AVERAGE_DESC' />
        <Picker.Item label='Lowest rated repositories' value='RATING_AVERAGE_ASC' />
      </Picker>
    </View>
  )
}

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryListContainer = ({ repositories, orderBy, setOrderBy, orderDirection, setOrderDirection }) => {
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Link to={`/${item.id}`}>
          <RepositoryItem repository={item} />
        </Link>
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <OrderSelector
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderDirection={orderDirection}
          setOrderDirection={setOrderDirection}
        />
      }
    />
  )
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT')
  const [orderDirection, setOrderDirection] = useState('DESC')
  const { repositories, loading, error } = useRepositories({ orderBy, orderDirection })

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error loading data</Text>
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      orderDirection={orderDirection}
      setOrderDirection={setOrderDirection}
    />
  )
}

export default RepositoryList
