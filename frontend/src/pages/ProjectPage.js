import { useQuery } from '@apollo/client'

import { PROJECTS_QUERY } from '../graphql/projectsQuery'

const ProjectPage = () => {
  const { loading, error, data } = useQuery(PROJECTS_QUERY)
  if (loading) {
    return 'Loading ...'
  }
  if (error) {
    return 'Error !!'
  }
  return (
    <div>
      Project
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default ProjectPage
