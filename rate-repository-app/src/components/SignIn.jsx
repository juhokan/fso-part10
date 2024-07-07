import React from 'react'
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import theme from '../theme'

const SignIn = () => {
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

  const onSubmit = (values) => {
    console.log('Login credentials:', values)
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Username'
        style={[
          styles.input,
          formik.touched.username && formik.errors.username ? styles.inputError : null
        ]}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />
      {formik.touched.username && formik.errors.username ? (
        <Text style={styles.error}>{formik.errors.username}</Text>
      ) : null}
      <TextInput
        placeholder='Password'
        style={[
          styles.input,
          formik.touched.password && formik.errors.password ? styles.inputError : null
        ]}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password ? (
        <Text style={styles.error}>{formik.errors.password}</Text>
      ) : null}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  )
}

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

export default SignIn
