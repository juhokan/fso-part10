import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import SignIn from './SignIn'
import theme from '../theme'
import RepositoryPage from './RepositoryPage'
import CreateReview from './CreateRepositoryPage'
import SignUp from './SignUpPage'
import MyReviews from './MyReviewsPage'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8'
  },
  content: {
    fontFamily: theme.fonts.main
  }
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.content}>
        <Routes>
          <Route path='/' element={<RepositoryList />} />
          <Route path=':id' element={<RepositoryPage />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/create' element={<CreateReview />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/myreviews' element={<MyReviews />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </View>
    </View>
  )
}

export default Main
