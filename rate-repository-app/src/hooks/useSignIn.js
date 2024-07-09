import { useMutation } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations'

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE)

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: {
          credentials: { username, password }
        }
      })

      return { data }
    } catch (error) {
      throw new Error('Error during sign in:', error)
    }
  }

  return [signIn, result]
}

export default useSignIn
