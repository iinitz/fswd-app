import { useQuery } from '@apollo/client'

import { HOMEWORKS_QUERY } from '../graphql/homeworksQuery'

const HomeworkPage = () => {
  const { loading, error, data } = useQuery(HOMEWORKS_QUERY)
  if (loading) {
    return 'Loading ...'
  }
  if (error) {
    return 'Error !!'
  }
  return (
    <div>
      Homework
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default HomeworkPage
