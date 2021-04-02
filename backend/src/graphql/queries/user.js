import { schemaComposer } from 'graphql-compose'

import {
  DeveloperTC, SeniorTC, UserModel, UserTC,
} from '../../models'
import { requiredAuth } from '../middlewares'

export const userId = UserTC.getResolver('findById')
export const seniors = SeniorTC.getResolver('findMany')
export const developers = DeveloperTC.getResolver('findMany')

export const me = schemaComposer.createResolver({
  name: 'me',
  type: UserTC.getDInterface().getType(),
  resolve: async ({ context }) => {
    const { _id } = context.user
    const user = await UserModel.findById(_id)
    return user
  },
}).wrapResolve(requiredAuth)
