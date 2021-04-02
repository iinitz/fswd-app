import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import Loading from '../components/Loading'
import { PROJECTS_QUERY } from '../graphql/projectsQuery'

const PageHeader = React.lazy(() => import('../components/PageHeader'))
const GridContainer = React.lazy(() => import('../components/GridContainer'))
const ProjectCard = React.lazy(() => import('../components/ProjectCard'))

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
          <ProjectCard key={project._id} {...project} />
        ))}
      </GridContainer>
    </div>
  )
}

export default ProjectPage
