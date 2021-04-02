import { useQuery } from '@apollo/client'

import Loading from '../components/Loading'
import PageHeader from '../components/PageHeader'
import { DEVELOPERS_QUERY } from '../graphql/developersQuery'

const DeveloperPage = () => {
  const { loading, error, data } = useQuery(DEVELOPERS_QUERY, { fetchPolicy: 'network-only' })
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
      <PageHeader title="Developer" />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default DeveloperPage
