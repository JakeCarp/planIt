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
    async remove(projectId, noteId) {
        const res = await api.delete('api/projects/' + projectId + '/notes/' + noteId)
        logger.log(res)
        AppState.notes = AppState.notes.filter(n => n.id !== noteId)
    }
}
export const notesService = new NotesService()