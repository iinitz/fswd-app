import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import './HomeworkCard.css'
import Card from '../Card'

const HomeworkCard = (props) => {
  const {
    name, url, repo, members, membersCount,
  } = props
  return (
    <Card
      header={name}
      actions={(
        <Fragment>
          {/* <Link className="Button HomeworkCard-button" to={`/homework/${workId}`}>Detail</Link> */}
          <span className="Button Button-disabled HomeworkCard-button">Detail</span>
          {url ? (<Link className="Button HomeworkCard-button" to={{ pathname: url }} target="_blank">Web</Link>) : null}
          {repo ? (<Link className="Button HomeworkCard-button" to={{ pathname: repo }} target="_blank">Repo</Link>) : null}
        </Fragment>
    )}
    >
      <pre>
        {JSON.stringify({ members: members.map((member) => (member.name)), membersCount }, null, 4)}
      </pre>
    </Card>
  )
}

export default HomeworkCard
