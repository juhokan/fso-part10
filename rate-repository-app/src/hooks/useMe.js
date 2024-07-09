import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'

const useMe = () => {
  const { data, error, loading, refetch } = useQuery(ME)

  const me = data ? data.me : null

  return { me, loading, error, refetch }
}

export default useMe
