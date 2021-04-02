import mongoose from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const DKey = 'role'
const enumUserRole = {
  ADMIN: 'Admin',
  SENIOR: 'Senior',
  DEVELOPER: 'Developer',
}
const UserSchema = new Schema({
  role: {
    type: String,
    enum: Object.keys(enumUserRole),
    default: 'Developer',
    index: true,
  },
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: { type: String, required: true, trim: true },
  password: { type: String, require: true, bcrypt: true },
}, { discriminatorKey: DKey })
UserSchema.plugin(bcrypt)
const AdminSchema = new Schema({})
const SeniorSchema = new Schema({
  title: { type: String, default: null },
  company: { type: String, default: null },
  contact: {
    github: { type: String, default: null },
    discord: { type: String, default: null },
    facebook: { type: String, default: null },
    twitter: { type: String, default: null },
    other: { type: String, default: null },
  },
})
const DeveloperSchema = new Schema({})

export const UserModel = mongoose.model('User', UserSchema)
export const AdminModel = UserModel.discriminator(enumUserRole.ADMIN, AdminSchema)
export const SeniorModel = UserModel.discriminator(enumUserRole.SENIOR, SeniorSchema)
export const DeveloperModel = UserModel.discriminator(enumUserRole.DEVELOPER, DeveloperSchema)

export const UserTC = composeWithMongooseDiscriminators(UserModel).removeField('password')
export const AdminTC = UserTC.discriminator(AdminModel, { name: enumUserRole.ADMIN })
export const SeniorTC = UserTC.discriminator(SeniorModel, { name: enumUserRole.SENIOR })
export const DeveloperTC = UserTC.discriminator(DeveloperModel, { name: enumUserRole.DEVELOPER })

export default UserModel
