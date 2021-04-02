import { useQuery } from '@apollo/client'

import { DEVELOPERS_QUERY } from '../graphql/developersQuery'

const DeveloperPage = () => {
  const { loading, error, data } = useQuery(DEVELOPERS_QUERY)
  if (loading) {
    return 'Loading ...'
  }
  if (error) {
    return 'Error !!'
  }
  return (
    <div>
      Developer
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default DeveloperPage
