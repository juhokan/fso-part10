import React from 'react'
import ReviewList from '../RepositoryPage/ReviewList'
import useMe from '../../hooks/useMe'

const MyReviews = () => {
  const { me, refetch } = useMe(true)
  
  console.log(me.reviews.edges);
  
  return (
    <ReviewList reviews={me.reviews.edges} refetch={refetch}/>
  )
}

export default MyReviews