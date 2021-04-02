import mongoose from 'mongoose'
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const DKey = 'type'
const enumWorkType = {
  HOMEWORK: 'Homework',
  PROJECT: 'Project',
}
const WorkSchema = new Schema({
  type: {
    type: String,
    require: true,
    enum: Object.keys(enumWorkType),
    index: true,
  },
  name: { type: String, required: true },
  url: { type: String, require: true },
  repo: { type: String, require: true },
  timestamp: { type: Date, default: Date.now },
  memberIds: [{
    type: String,
    require: true,
    index: true,
    ref: 'User',
  }],
  membersLimit: { type: Number, enum: [2, 4] },
}, { discriminatorKey: DKey })
const HomeworkSchema = new Schema({
  membersLimit: { type: Number, default: 2 },
})
const ProjectSchema = new Schema({
  membersLimit: { type: Number, default: 4 },
})

const discriminatorOptions = {
  inputType: {
    removeFields: ['timestamp', 'memberIds', 'membersLimit'],
  },
}
export const WorkModel = mongoose.model('Work', WorkSchema)
export const HomeworkModel = WorkModel.discriminator(enumWorkType.HOMEWORK, HomeworkSchema)
export const ProjectModel = WorkModel.discriminator(enumWorkType.PROJECT, ProjectSchema)

export const WorkTC = composeWithMongooseDiscriminators(WorkModel)
export const HomeworkTC = WorkTC.discriminator(HomeworkModel, { name: enumWorkType.HOMEWORK, ...discriminatorOptions })
export const ProjectTC = WorkTC.discriminator(ProjectModel, { name: enumWorkType.PROJECT, ...discriminatorOptions })

export default WorkModel
