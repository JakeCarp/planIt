import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProjectsService{
async getAll(){
  const res = await api.get('api/projects')
  logger.log('GET ALL PROJECTS',res.data)
  AppState.projects = res.data
}
async getById(id){
  const res = await api.get('api/projects/' + id)
  logger.log('GET BY ID PROJECTS',res.data)
  AppState.activeProject = res.data
}
async createProject(projData){
  const res = await api.post('api/projects', projData)
  logger.log('CREATE PROJECT',res.data)
  AppState.projects.unshift(res.data)
}
async editProject(data){
  const res = await api.put('api/projects/'+ data.id, data)
  logger.log('EDIT PROJECT', res.data)
  let updated = res.data
  AppState.activeProject = updated
  let index = AppState.projects.findIndex( p => p.id === updated.id)
  AppState.projects.splice(index, 1, updated)
}
async removeProject(id){
  const res = await api.delete('api/projects/'+ id)
  logger.log('REMOVE PROJECT', res.data)
  AppState.projects = AppState.projects.filter( p => p.id !== id)
}
}
export const projectsService = new ProjectsService()