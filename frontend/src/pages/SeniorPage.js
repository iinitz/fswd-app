import { useQuery } from '@apollo/client'

import { SENIORS_QUERY } from '../graphql/seniorsQuery'

const SeniorPage = () => {
  const { loading, error, data } = useQuery(SENIORS_QUERY)
  if (loading) {
    return 'Loading ...'
  }
  if (error) {
    return 'Error !!'
  }
  return (
    <div>
      Senior
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default SeniorPage
