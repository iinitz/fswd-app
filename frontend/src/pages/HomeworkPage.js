import React from 'react'
import { useQuery } from '@apollo/client'

import Loading from '../components/Loading'
import { HOMEWORKS_QUERY } from '../graphql/homeworksQuery'

const PageHeader = React.lazy(() => import('../components/PageHeader'))
const GridContainer = React.lazy(() => import('../components/GridContainer'))
const HomeworkCard = React.lazy(() => import('../components/HomeworkCard'))

const HomeworkPage = () => {
  const { loading, error, data } = useQuery(HOMEWORKS_QUERY, { fetchPolicy: 'network-only' })
  if (loading) {
    return (
      <Loading />
    )
  }
  if (error) {
    return 'Error !!'
  }
  const { homeworks } = data
  return (
    <div>
      <PageHeader title="Homework" />
      <GridContainer>
        {homeworks?.map((homework) => (
          <HomeworkCard key={homework._id} {...homework} />
        ))}
      </GridContainer>
    </div>
  )
}

export default HomeworkPage
