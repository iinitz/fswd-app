import { Fragment } from 'react'

import './SeniorCard.css'
import Card from '../Card'

const SeniorCard = (props) => {
  const {
    name, title, company, contact,
  } = props
  const {
    github, discord, facebook, twitter,
  } = contact
  return (
    <Card
      header={name}
      actions={(
        <Fragment>
          <span className="Button SeniorCard-button SeniorCard-disabled">{title} @ {company}</span>
        </Fragment>
      )}
    >
      <pre>
        {JSON.stringify({
          github, discord, facebook, twitter,
        }, null, 4)}
      </pre>
    </Card>
  )
}

export default SeniorCard
