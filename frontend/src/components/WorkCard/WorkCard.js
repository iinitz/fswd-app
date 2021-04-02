import { useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import './WorkCard.css'
import Divider from '../Divider'
import { useSession } from '../../contexts/SessionContext'
import { PROJECTS_QUERY } from '../../graphql/projectsQuery'
import { JOIN_GROUP_MUTATION } from '../../graphql/joinGroupMutation'
import { LEAVE_GROUP_MUTATION } from '../../graphql/leaveGroupMutation'

const WorkCard = (props) => {
  const { user } = useSession()
  const [joinGroup] = useMutation(JOIN_GROUP_MUTATION)
  const [leaveGroup] = useMutation(LEAVE_GROUP_MUTATION)
  const {
    _id: workId, type, name, url, repo, members, membersCount, membersLimit,
  } = props
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
      if (type === 'Homework') {
        return null
      }
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
    [handleJoinGroup, handleLeaveGroup, members, membersLimit, type, user?._id, user?.role],
  )
  return (
    <article className="WorkCard-card">
      <pre>
        {JSON.stringify({
          name, url, repo, members: members.map((member) => (member.name)), membersCount,
        }, null, 4)}
      </pre>
      <div className="Space" />
      <Divider />
      <div className="WorkCard-actions">
        <Link className="Button WorkCard-button" to={{ pathname: url }} target="_blank">Preview</Link>
        <Link className="Button WorkCard-button" to={{ pathname: repo }} target="_blank">Repo</Link>
        <div className="Space" />
        {renderActions}
      </div>
    </article>
  )
}

export default WorkCard
