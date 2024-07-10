import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 4,
    borderRadius: 4,
    flexDirection: 'column',
    padding: 10
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 4
  },
  flexCol: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4
  },
  avatar: {
    height: 64,
    width: 64,
    borderRadius: 4,
    marginRight: 10
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1
  },
  fullName: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    paddingBottom: 4
  },
  description: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.normal,
    paddingBottom: 4
  },
  languageContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  language: {
    fontSize: theme.fontSizes.body,
    color: 'white',
    backgroundColor: theme.colors.primary,
    padding: 8,
    borderRadius: 4,
    fontWeight: theme.fontWeights.normal,
    overflow: 'hidden'
  }
})

export const formatNumber = (number) => {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k'
  }
  
  return number.toString()
}


const RepositoryItem = ({ repository }) => {
  return (
    <View testID='repositoryItem' style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image 
          source={{ uri: repository.ownerAvatarUrl }} 
          style={styles.avatar} 
        />
        <View style={styles.textContainer}>
          <Text style={styles.fullName}>{repository.fullName}</Text>
          <Text style={styles.description}>{repository.description}</Text>
          <View style={styles.languageContainer}>
            <Text style={styles.language}>{repository.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flexRow}>
        <View style={styles.flexCol}>
          <Text style={styles.fullName}>{formatNumber(repository.stargazersCount)}</Text>
          <Text style={styles.description}>Stars</Text>
        </View>
        <View style={styles.flexCol}>
          <Text style={styles.fullName}>{formatNumber(repository.forksCount)}</Text>
          <Text style={styles.description}>Forks</Text>
        </View>
        <View style={styles.flexCol}>
          <Text style={styles.fullName}>{formatNumber(repository.reviewCount)}</Text>
          <Text style={styles.description}>Reviews</Text>
        </View>
        <View style={styles.flexCol}>
          <Text style={styles.fullName}>{repository.ratingAverage}</Text>
          <Text style={styles.description}>Rating</Text>
        </View>
      </View>
    </View>
  )
}


export default RepositoryItem
