import { useApolloClient, useMutation } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations'
import useAuthStorage from './useAuthStorage'

const useSignIn = () => {
  const authStorage = useAuthStorage()
  const [mutate, result] = useMutation(AUTHENTICATE)
  const apolloClient = useApolloClient()

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: {
          credentials: { username, password }
        }
      })
      await authStorage.setAccessToken(data.authenticate.accessToken)
      apolloClient.resetStore()
      return { data }
    } catch (error) {
      throw new Error('Error during sign in:', error)
    }
  }

  return [signIn, result]
}

export default useSignIn
