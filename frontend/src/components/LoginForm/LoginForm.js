import { useCallback, useState } from 'react'

import './LoginForm.css'
import { useSession } from '../../contexts/SessionContext'

const LoginForm = () => {
  const { login } = useSession()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(false)
  const handleUsernameChange = useCallback(
    (e) => {
      setUsername(e.target.value)
    },
    [],
  )
  const handlePasswordChange = useCallback(
    (e) => {
      setPassword(e.target.value)
    },
    [],
  )
  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault()
      if (!disabled) {
        setDisabled(true)
        try {
          await login(username, password)
        } catch (err) {
          alert(err?.message)
          setDisabled(false)
        }
      }
    },
    [disabled, login, password, username],
  )
  return (
    <form className="LoginForm-form" onSubmit={handleLogin}>
      <input className="LoginForm-input LoginForm-username" type="text" value={username} onChange={handleUsernameChange} placeholder="Username" required />
      <input className="LoginForm-input LoginForm-password" type="password" value={password} onChange={handlePasswordChange} placeholder="Password" required />
      <button className="LoginForm-button" type="submit" disabled={disabled}>Login</button>
    </form>
  )
}

export default LoginForm
