import React from 'react'
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import theme from '../../theme'
import useCreateUser from '../../hooks/useCreateUser'
import useSignIn from '../../hooks/useSignIn'
import { useNavigate } from 'react-router-native'

const SignUpForm = ({ onSubmit, values, handleChange, handleBlur, errors, touched }) => {
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
      <TextInput
        placeholder='Password Confirmation'
        style={[
          styles.input,
          touched.passwordConfirm && errors.passwordConfirm ? styles.inputError : null
        ]}
        value={values.passwordConfirm}
        onChangeText={handleChange('passwordConfirm')}
        onBlur={handleBlur('passwordConfirm')}
        secureTextEntry
      />
      {touched.passwordConfirm && errors.passwordConfirm ? (
        <Text style={styles.error}>{errors.passwordConfirm}</Text>
      ) : null}
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  )
}

const SignUpContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
    passwordConfirm: ''
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, 'Username must be between 5 and 30 characters')
      .max(30, 'Username must be between 5 and 30 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(5, 'Password must be between 5 and 50 characters')
      .max(50, 'Password must be between 5 and 50 characters')
      .required('Password is required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required')
  })

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, handleChange, handleBlur, errors, touched }) => (
        <SignUpForm
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

const SignUp = () => {
  const [createUser] = useCreateUser()
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      const { data } = await createUser({ username, password })
      if (data) {
        await signIn({ username, password })
        navigate('/')
      }
    } catch (e) {
      console.log('Error signing up:', e)
    }
  }

  return <SignUpContainer onSubmit={onSubmit} />
}

export default SignUp
