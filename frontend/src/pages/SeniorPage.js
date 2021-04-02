import { useQuery } from '@apollo/client'

import Loading from '../components/Loading'
import PageHeader from '../components/PageHeader'
import { SENIORS_QUERY } from '../graphql/seniorsQuery'

const SeniorPage = () => {
  const { loading, error, data } = useQuery(SENIORS_QUERY, { fetchPolicy: 'network-only' })
  if (loading) {
    return (
      <Loading />
    )
  }
  if (error) {
    return 'Error !!'
  }
  return (
    <div>
      <PageHeader title="Senior" />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default SeniorPage
