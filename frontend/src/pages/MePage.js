import React, { useCallback, useMemo } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import Loading from '../components/Loading'
import { ME_DETAIL_QUERY } from '../graphql/meDetailQuery'
import { CHANGE_PASSWORD_MUTATION } from '../graphql/changePasswordMutation'

const PageHeader = React.lazy(() => import('../components/PageHeader'))
const SeniorCard = React.lazy(() => import('../components/SeniorCard'))
const DeveloperCard = React.lazy(() => import('../components/DeveloperCard'))

const MePage = () => {
  const { loading, error, data } = useQuery(ME_DETAIL_QUERY, { fetchPolicy: 'network-only' })
  const [changePassword] = useMutation(CHANGE_PASSWORD_MUTATION)
  const handleChangePassword = useCallback(
    async () => {
      const password = prompt('Enter new password')
      if (password) {
        try {
          await changePassword({ variables: { password } })
          alert('Change password success')
        } catch (err) {
          alert(err?.message)
        }
      }
    },
    [changePassword],
  )
  const renderUser = useMemo(
    () => {
      if (data?.me?.role === 'Senior') {
        return (
          <SeniorCard {...data?.me} />
        )
      }
      if (data?.me?.role === 'Developer') {
        return (
          <DeveloperCard {...data?.me} />
        )
      }
      return null
    },
    [data?.me],
  )
  if (loading) {
    return (
      <Loading />
    )
  }
  if (error) {
    return 'Error !!'
  }
  return (
    <div>
      <PageHeader title={data?.me?.name}>
        <button className="Button Button-border" type="button" onClick={handleChangePassword}>Change password</button>
      </PageHeader>
      {renderUser}
    </div>
  )
}

export default MePage
