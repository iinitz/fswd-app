import { AuthenticationError } from 'apollo-server-express'

export const requiredAuth = (next) => (rp) => {
  if (!rp.context.user) {
    throw new AuthenticationError('Authentication required')
  }
  return next(rp)
}
