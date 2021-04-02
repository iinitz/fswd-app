import { useQuery } from '@apollo/client'

import Loading from '../components/Loading'
import PageHeader from '../components/PageHeader'
import GridContainer from '../components/GridContainer'
import WorkCard from '../components/WorkCard/WorkCard'
import { HOMEWORKS_QUERY } from '../graphql/homeworksQuery'

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
          <WorkCard key={homework._id} {...homework} />
        ))}
      </GridContainer>
    </div>
  )
}

export default HomeworkPage
