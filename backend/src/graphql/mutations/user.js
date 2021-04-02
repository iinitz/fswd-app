import { ValidationError } from 'apollo-server-express'
import { schemaComposer } from 'graphql-compose'
import jsonwebtoken from 'jsonwebtoken'

import { UserModel, UserTC } from '../../models'
import { requiredAuth } from '../middlewares'

export const createUser = UserTC.getResolver('createOne')

const LoginPayload = schemaComposer.createObjectTC({
  name: 'LoginPayload',
  fields: {
    token: 'String',
    user: UserTC.getType(),
    requiredNewPassword: 'Boolean',
  },
})
export const login = schemaComposer.createResolver({
  name: 'login',
  args: {
    username: 'String!',
    password: 'String!',
  },
  type: LoginPayload,
  resolve: async ({ args }) => {
    const { username, password } = args
    const user = await UserModel.findOne({ username })
    if (!user) {
      throw new ValidationError(`Username ${username} not found`)
    }
    const valid = await user.verifyPassword(password)
    if (!valid) {
      throw new ValidationError('Incorrect password')
    }
    const requiredNewPassword = await user.verifyPassword(username)
    return {
      token: jsonwebtoken.sign({ _id: user._id, role: user.role }, process.env.SECRET ?? 'local-secret', { expiresIn: '1d', algorithm: 'HS256' }),
      user,
      requiredNewPassword,
    }
  },
})

const ChangePasswordPayload = schemaComposer.createObjectTC({
  name: 'ChangePasswordPayload',
  fields: {
    token: 'String',
    user: UserTC.getType(),
  },
})
export const changePassword = schemaComposer.createResolver({
  name: 'changePassword',
  args: {
    password: 'String!',
  },
  type: ChangePasswordPayload,
  resolve: async ({ args, context }) => {
    const { password } = args
    const { _id: userId } = context.user
    const user = await UserModel.findByIdAndUpdate(userId, { $set: { password } }, { new: true })
    if (!user) {
      throw new ValidationError('Invalid user ID')
    }
    return {
      token: jsonwebtoken.sign({ _id: user._id, role: user.role }, process.env.SECRET ?? 'local-secret', { expiresIn: '1d', algorithm: 'HS256' }),
      user,
    }
  },
}).wrapResolve(requiredAuth)
