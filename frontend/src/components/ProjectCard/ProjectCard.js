import { Fragment, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import './ProjectCard.css'
import Card from '../Card'
import { useSession } from '../../contexts/SessionContext'
import { PROJECTS_QUERY } from '../../graphql/projectsQuery'
import { JOIN_GROUP_MUTATION } from '../../graphql/joinGroupMutation'
import { LEAVE_GROUP_MUTATION } from '../../graphql/leaveGroupMutation'

const ProjectCard = (props) => {
  const {
    _id: workId, name, url, repo, members, membersCount, membersLimit,
  } = props
  const { user } = useSession()
  const [joinGroup] = useMutation(JOIN_GROUP_MUTATION)
  const [leaveGroup] = useMutation(LEAVE_GROUP_MUTATION)
  const handleJoinGroup = useCallback(
    async () => {
      try {
        await joinGroup({ variables: { workId }, refetchQueries: [{ query: PROJECTS_QUERY }] })
        alert('Join group success')
      } catch (err) {
        alert(err?.message)
      }
    },
    [joinGroup, workId],
  )
  const handleLeaveGroup = useCallback(
    async () => {
      try {
        await leaveGroup({ variables: { workId }, refetchQueries: [{ query: PROJECTS_QUERY }] })
        alert('Leave group success')
      } catch (err) {
        alert(err?.message)
      }
    },
    [leaveGroup, workId],
  )
  const renderActions = useMemo(
    () => {
      if (user?.role === 'Developer') {
        if (members.some((member) => (member._id === user?._id))) {
          return (
            <button className="Button Button-border" type="button" onClick={handleLeaveGroup}>Leave</button>
          )
        }
        if (members.length === membersLimit) {
          return (
            <button className="Button Button-border" type="button" disabled>Group full</button>
          )
        }
        return (
          <button className="Button Button-border" type="button" onClick={handleJoinGroup}>Join</button>
        )
      }
      return null
    },
    [handleJoinGroup, handleLeaveGroup, members, membersLimit, user?._id, user?.role],
  )
  return (
    <Card
      header={name}
      actions={(
        <Fragment>
          {/* <Link className="Button ProjectCard-button" to={`/project/${workId}`}>Detail</Link> */}
          <span className="Button Button-disabled ProjectCard-button">Detail</span>
          {url ? (<Link className="Button ProjectCard-button" to={{ pathname: url }} target="_blank">Web</Link>) : null}
          {repo ? (<Link className="Button ProjectCard-button" to={{ pathname: repo }} target="_blank">Repo</Link>) : null}
          <div className="Space" />
          {renderActions}
        </Fragment>
    )}
    >
      <pre>
        {JSON.stringify({ members: members.map((member) => (member.name)), membersCount }, null, 4)}
      </pre>
    </Card>
  )
}

export default ProjectCard
