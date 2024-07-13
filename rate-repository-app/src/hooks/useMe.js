import { useQuery } from '@apollo/client'
import { ME, MY_REVIEWS } from '../graphql/queries'

const useMe = (reviews = false) => {
  const query = reviews ? MY_REVIEWS : ME
  const { data, error, loading, refetch } = useQuery(query)

  const me = data ? data.me : null

  return { me, loading, error, refetch }
}

export default useMe