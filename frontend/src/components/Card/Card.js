import { Fragment, useMemo } from 'react'

import './Card.css'
import Divider from '../Divider'

const Card = (props) => {
  const { children, header, actions } = props
  const cardHeader = useMemo(
    () => {
      if (header) {
        return (
          <Fragment>
            <h4 className="Card-header">{header}</h4>
            <Divider />
          </Fragment>
        )
      }
      return null
    },
    [header],
  )
  const cardBody = useMemo(
    () => {
      if (children) {
        return (
          <Fragment>
            {children}
            <div className="Space" />
            <Divider />
          </Fragment>
        )
      }
      return null
    },
    [children],
  )
  const cardActions = useMemo(
    () => {
      if (actions) {
        return (
          <div className="Card-actions">
            {actions}
          </div>
        )
      }
      return null
    },
    [actions],
  )
  return (
    <div className="Card">
      {cardHeader}
      {cardBody}
      {cardActions}
    </div>
  )
}

export default Card
