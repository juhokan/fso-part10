import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = ({ orderBy, orderDirection }) => {
  console.log(orderBy, orderDirection)
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy, orderDirection
    }
  })

  const repositories = data ? data.repositories : null

  return { repositories, loading, error, refetch }
}

export default useRepositories
