import React from 'react'
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import useCreateReview from '../../hooks/useCreateReview'
import { useNavigate } from 'react-router-native'
import theme from '../../theme'

const CreateReviewForm = ({ onSubmit, values, handleChange, handleBlur, errors, touched }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: 'white',
      padding: 20,
      margin: 4,
      borderRadius: 4
    },
    input: {
      height: 40,
      width: '100%',
      borderWidth: 1,
      borderColor: theme.colors.inputBorder,
      marginBottom: 10,
      padding: 10,
      borderRadius: 4
    },
    inputError: {
      borderColor: 'red'
    },
    button: {
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: 4,
      width: '100%',
      alignItems: 'center'
    },
    buttonText: {
      color: 'white',
      fontSize: theme.fontSizes.subheading,
      fontWeight: theme.fontWeights.bold
    },
    error: {
      color: 'red',
      marginBottom: 8
    },
    multilineInput: {
      height: 80
    }
  })

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Repository Owner's GitHub Username"
        style={[
          styles.input,
          touched.ownerName && errors.ownerName ? styles.inputError : null
        ]}
        value={values.ownerName}
        onChangeText={handleChange('ownerName')}
        onBlur={handleBlur('ownerName')}
      />
      {touched.ownerName && errors.ownerName ? (
        <Text style={styles.error}>{errors.ownerName}</Text>
      ) : null}
      <TextInput
        placeholder="Repository's Name"
        style={[
          styles.input,
          touched.repositoryName && errors.repositoryName ? styles.inputError : null
        ]}
        value={values.repositoryName}
        onChangeText={handleChange('repositoryName')}
        onBlur={handleBlur('repositoryName')}
      />
      {touched.repositoryName && errors.repositoryName ? (
        <Text style={styles.error}>{errors.repositoryName}</Text>
      ) : null}
      <TextInput
        placeholder='Rating (0-100)'
        style={[
          styles.input,
          touched.rating && errors.rating ? styles.inputError : null
        ]}
        value={values.rating}
        onChangeText={handleChange('rating')}
        onBlur={handleBlur('rating')}
        keyboardType='numeric'
      />
      {touched.rating && errors.rating ? (
        <Text style={styles.error}>{errors.rating}</Text>
      ) : null}
      <TextInput
        placeholder='Review'
        style={[
          styles.input,
          styles.multilineInput,
          touched.text && errors.text ? styles.inputError : null
        ]}
        value={values.text}
        onChangeText={handleChange('text')}
        onBlur={handleBlur('text')}
        multiline
      />
      {touched.text && errors.text ? (
        <Text style={styles.error}>{errors.text}</Text>
      ) : null}
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Create Review</Text>
      </Pressable>
    </View>
  )
}

export const CreateReviewContainer = ({ onSubmit }) => {
  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
  }

  const validationSchema = Yup.object().shape({
    ownerName: Yup.string()
      .required('Repository owner\'s username is required'),
    repositoryName: Yup.string()
      .required('Repository\'s name is required'),
    rating: Yup.number()
      .min(0, 'Rating must be at least 0')
      .max(100, 'Rating must be at most 100')
      .required('Rating is required'),
    text: Yup.string()
  })

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, handleChange, handleBlur, errors, touched }) => (
        <CreateReviewForm
          onSubmit={handleSubmit}
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors}
          touched={touched}
        />
      )}
    </Formik>
  )
}

const CreateReview = () => {
  const [createReview] = useCreateReview()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values
    try {
      const { data } = await createReview({ text, repositoryName, rating, ownerName })
      console.log('Review creation successful:', data)
      navigate(`/${data.createReview.repositoryId}`)
    } catch (e) {
      console.log(e)
    }
  }

  return <CreateReviewContainer onSubmit={onSubmit} />
}

export default CreateReview
