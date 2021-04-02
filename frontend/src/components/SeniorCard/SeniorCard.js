import { Fragment } from 'react'
import { Link } from 'react-router-dom'

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
          <span className="Button SeniorCard-button SeniorCard-disabled">Contact: {!github && !discord && !facebook && !twitter ? '-' : null}</span>
          {github ? (<Link className="Button SeniorCard-button" to={{ pathname: github }} target="_blank">Github</Link>) : null}
          {discord ? (<Link className="Button SeniorCard-button" to={{ pathname: discord }} target="_blank">Discord</Link>) : null}
          {facebook ? (<Link className="Button SeniorCard-button" to={{ pathname: facebook }} target="_blank">Facebook</Link>) : null}
          {twitter ? (<Link className="Button SeniorCard-button" to={{ pathname: twitter }} target="_blank">Twitter</Link>) : null}
        </Fragment>
      )}
    >
      <pre>
        {JSON.stringify({ title, company }, null, 4)}
      </pre>
    </Card>
  )
}

export default SeniorCard
