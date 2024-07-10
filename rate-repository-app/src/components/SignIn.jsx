import React from 'react'
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import theme from '../theme'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'

const SignInForm = ({ onSubmit, values, handleChange, handleBlur, errors, touched }) => {
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
    }
  })

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Username'
        style={[
          styles.input,
          touched.username && errors.username ? styles.inputError : null
        ]}
        value={values.username}
        onChangeText={handleChange('username')}
        onBlur={handleBlur('username')}
      />
      {touched.username && errors.username ? (
        <Text style={styles.error}>{errors.username}</Text>
      ) : null}
      <TextInput
        placeholder='Password'
        style={[
          styles.input,
          touched.password && errors.password ? styles.inputError : null
        ]}
        value={values.password}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        secureTextEntry
      />
      {touched.password && errors.password ? (
        <Text style={styles.error}>{errors.password}</Text>
      ) : null}
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  )
}

export const SignInContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: ''
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'Username must be at least 4 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
  })

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, handleChange, handleBlur, errors, touched }) => (
        <SignInForm
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

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values
    console.log('credentials: username:', username, ' password: ', password)
    try {
      const { data } = await signIn({ username, password })
      console.log('Login successful:', data)
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return <SignInContainer onSubmit={onSubmit} />
}

export default SignIn
