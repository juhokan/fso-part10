import React from 'react'
import { Text, View, ActivityIndicator, StyleSheet, Pressable } from 'react-native'
import useRepository from '../../hooks/useRepository'
import { useParams } from 'react-router-native'
import RepositoryItem from '../RepositoryItem'
import { openURL } from 'expo-linking'
import theme from '../../theme'
import ReviewList from './ReviewList'

const RepositoryPage = () => {
  const { id } = useParams()
  const { data, loading, error } = useRepository(id)

  if (loading) {
    return <ActivityIndicator size='large' color='#0000ff' />
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error.message}</Text>
  }

  if (!data || !data.repository) {
    return <Text style={styles.errorText}>No repository data found.</Text>
  }


  return (
    <View style={styles.container}>
      <RepositoryItem repository={data.repository} />
      <Pressable onPress={() => openURL(data.repository.url)} style={styles.button}>
        <Text style={styles.buttonText}>Open in GitHub</Text>
      </Pressable>
      <ReviewList reviews={data.repository.reviews.edges} /> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    maxHeight: '95%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    margin: 4,
    color: 'white',
    borderRadius: 4,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold
  }
})

export default RepositoryPage