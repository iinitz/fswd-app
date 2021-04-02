import { useQuery } from '@apollo/client'

import Loading from '../components/Loading'
import PageHeader from '../components/PageHeader'
import { ME_DETAIL_QUERY } from '../graphql/meDetailQuery'

const MePage = () => {
  const { loading, error, data } = useQuery(ME_DETAIL_QUERY, { fetchPolicy: 'network-only' })
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
      <PageHeader title={data?.me?.name}>
        <button className="Button Button-border" type="button" onClick={() => prompt('Enter new password')}>Change password</button>
      </PageHeader>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default MePage
