import React from 'react'
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native'
import theme from '../../theme'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-native'
import useDeleteReview from '../../hooks/useDeleteReview'

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  container: {
    backgroundColor: 'white',
    margin: 4,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  rating: {
    margin: 4,
    flexDirection: 'row',
    borderWidth: 3,
    borderRadius: 20,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40
  },
  ratingText: {
    flexDirection: 'row',
    color: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold
  },
  flexCol: {
    flexDirection: 'column',
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
    flex: 1,
    padding: 2,
    width: 310
  },
  fullName: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    padding: 2
  },
  description: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.normal,
    padding: 2
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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  }
})

const ItemSeparator = () => <View style={styles.separator} />

const ReviewItem = ({ review, refetch }) => {
  const [deleteReview] = useDeleteReview()
  const navigate = useNavigate()
  const formattedDate = format(new Date(review.node.createdAt), 'dd.MM.yyyy')

  console.log('review:' , review)

  const handleViewRepository = () => {
    navigate(`/${review.node.repositoryId}`)
  }

  const handleDeleteReview = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel'
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteReview({ id: review.node.id })
              refetch()
            } catch (err) {
              console.log(err.message)
            }
          }
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text style={styles.ratingText}>{review.node.rating}</Text>
      </View>
      <View style={styles.flexCol}>
        <Text style={styles.fullName}>{review.node.user.username}</Text>
        <Text style={styles.description}>{formattedDate}</Text>
        {review.node.text && 
        <Text style={styles.textContainer}>{review.node.text}</Text>}
        <View style={styles.buttonContainer}>
          <Button title='View Repository' onPress={handleViewRepository} />
          <Button title='Delete Review' onPress={handleDeleteReview} />
        </View>
      </View>
    </View>
  )
}

const ReviewList = ({reviews, refetch}) => {
  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch}/>}
      keyExtractor={({ id }) => id}
    />
  )
}

export default ReviewList