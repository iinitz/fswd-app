import React from 'react'
import { useQuery } from '@apollo/client'

import Loading from '../components/Loading'
import { SENIORS_QUERY } from '../graphql/seniorsQuery'

const PageHeader = React.lazy(() => import('../components/PageHeader'))
const GridContainer = React.lazy(() => import('../components/GridContainer'))
const SeniorCard = React.lazy(() => import('../components/SeniorCard'))

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
  const { seniors } = data
  return (
    <div>
      <PageHeader title="Senior" />
      <GridContainer>
        {seniors?.map((senior) => (
          <SeniorCard key={senior._id} {...senior} />
        ))}
      </GridContainer>
    </div>
  )
}

export default SeniorPage
