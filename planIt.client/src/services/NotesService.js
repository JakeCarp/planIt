import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class NotesService{
    async createNote(body, projectId) {
        const res = await api.post('api/projects/' + projectId + '/notes', body)
        logger.log(res.data)
        AppState.notes.unshift(res.data)
    }
    async getAll(projectId) {
        const res = await api.get('api/projects/' + projectId + '/notes')
        logger.log(res.data)
        AppState.notes = res.data
    }
}
export const notesService = new NotesService()