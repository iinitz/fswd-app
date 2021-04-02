import { Fragment } from 'react'
// import { Link } from 'react-router-dom'

import './DeveloperCard.css'
import Card from '../Card'

const DeveloperCard = (props) => {
  const {
    name, username, homework, project,
  } = props
  return (
    <Card
      header={`${username}: ${name}`}
      actions={(
        <Fragment>
          {project ? (
            // <Link className="Button" to={`/project/${project._id}`}>Project: {project.name}</Link>
            <span className="Button Button-disabled">Project: {project.name}</span>
          ) : (
            <span className="Button Button-disabled">Project: -</span>
          )}
          <div className="Space" />
          {homework ? (
            // <Link className="Button" to={`/homework/${homework._id}`}>Homework: {homework.name}</Link>
            <span className="Button Button-disabled">Homework: {homework.name}</span>
          ) : (
            <span className="Button Button-disabled">Homework: -</span>
          )}
        </Fragment>
      )}
    />
  )
}

export default DeveloperCard
