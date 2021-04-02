import { useQuery } from '@apollo/client'

import { ME_DETAIL_QUERY } from '../graphql/meDetailQuery'

const MePage = () => {
  const { loading, error, data } = useQuery(ME_DETAIL_QUERY, { fetchPolicy: 'network-only' })
  if (loading) {
    return 'Loading ...'
  }
  if (error) {
    return 'Error !!'
  }
  return (
    <div>
      Me
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default MePage
