import './mongoose-connect'
import {
  DeveloperModel, HomeworkModel, ProjectModel, SeniorModel,
} from './models'
import developers from './data/developers.json'
import seniors from './data/seniors.json'
import homeworks from './data/homewroks.json'

const migrate = async () => {
  const developerDocs = await DeveloperModel.create(developers.map((user) => ({ ...user })))
  const devs = developerDocs.reduce((prev, cur) => ({ ...prev, [cur.username]: cur._id }), {})
  const mapId = (usernames) => usernames.reduce(
    (prev, cur) => {
      if (devs[cur]) {
        return [...prev, devs[cur]]
      }
      return prev
    },
    [],
  )
  await SeniorModel.create(seniors.map((user) => ({ ...user })))
  await HomeworkModel.create(homeworks.map(({ memberIds, ...detail }, index) => ({ name: `HW G${index + 1}`, ...detail, memberIds: mapId(memberIds) })))
  await ProjectModel.create(Array(15).fill().map((_, index) => ({ name: `Group ${index + 1}` })))
  console.log('Migrate completed')
}
migrate()
