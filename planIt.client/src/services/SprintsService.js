import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SprintsService{
  
async getAll(projectId){
  const res = await api.get('api/projects/' + projectId +'/sprints')
  logger.log('SPRINTS GET ALL', res.data)
  AppState.sprints = res.data
}
// TODO re-implement this if there is a need.
// async getById(projectId, id){
// const res = await api.get('api/projects/' + projectId +'/sprints/'+ id)
//   logger.log('GET SPRINT BY ID')
//   return res.data
// }
async createSprint(projectId, data){
  const res = await api.post('api/projects/'+projectId+'/sprints')
  logger.log('POST SPRINT', res.data)
  AppState.sprints.unshift(res.data)
}
async editSprint(data, projectId, id){
const res = await api.put('api/projects/'+projectId+'/sprints/'+id)
logger.log('PUT SPRINT', res.data)
let updated = res.data
let index = AppState.sprints.findIndex( p => p.id === updated.id)
AppState.sprints.splice(index, 1, updated)
}
async removeProject(projectId, id){
  const res = await api.delete('api/projects/' + projectId + '/sprints/'+id)
  logger.log('REMOVE SPRINT', res.data)
  AppState.sprints = AppState.sprints.filter( s => s.id !== id)
}
}
export const sprintsService = new SprintsService()