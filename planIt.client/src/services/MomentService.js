import  moment  from 'moment'
import { logger } from '../utils/Logger'

class MomentService {
    timeAgo(time ) {
        const timeAgo = moment(time).fromNow()
        return timeAgo
}
}

export const momentService = new MomentService()