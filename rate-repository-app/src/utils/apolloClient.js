import { ApolloClient, InMemoryCache } from '@apollo/client'
import Constants from 'expo-constants'

const URI = Constants.expoConfig.extra.uri

const createApolloClient = () => {
  console.log(URI)
  return new ApolloClient({
    uri: `${URI}`,
    cache: new InMemoryCache()
  })
}

export default createApolloClient