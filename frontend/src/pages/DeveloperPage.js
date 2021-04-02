import React from 'react'
import { useQuery } from '@apollo/client'

import Loading from '../components/Loading'
import { DEVELOPERS_QUERY } from '../graphql/developersQuery'

const PageHeader = React.lazy(() => import('../components/PageHeader'))
const GridContainer = React.lazy(() => import('../components/GridContainer'))
const DeveloperCard = React.lazy(() => import('../components/DeveloperCard'))

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
  const { developers } = data
  return (
    <div>
      <PageHeader title="Developer" />
      <GridContainer>
        {developers?.map((developer) => (
          <DeveloperCard key={developer._id} {...developer} />
        ))}
      </GridContainer>
    </div>
  )
}

export default DeveloperPage
