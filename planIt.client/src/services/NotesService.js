import { api } from "./AxiosService"

class NotesService{
    async createNote(body) {
    const res = await api.post('', body)
}
}
export const notesService = new NotesService()