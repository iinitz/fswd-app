import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import Loading from '../components/Loading'
import PageHeader from '../components/PageHeader'
import GridContainer from '../components/GridContainer'
import WorkCard from '../components/WorkCard/WorkCard'
import { PROJECTS_QUERY } from '../graphql/projectsQuery'

const ProjectPage = () => {
  const { loading, error, data } = useQuery(PROJECTS_QUERY, { fetchPolicy: 'network-only' })
  if (loading) {
    return (
      <Loading />
    )
  }
  if (error) {
    return 'Error !!'
  }
  const { projects } = data
  return (
    <div>
      <PageHeader title="Project">
        <Link className="Button Button-border" to="/project/requirements">Requirements</Link>
      </PageHeader>
      <GridContainer>
        {projects?.map((project) => (
          <WorkCard key={project._id} {...project} />
        ))}
      </GridContainer>
    </div>
  )
}

export default ProjectPage
