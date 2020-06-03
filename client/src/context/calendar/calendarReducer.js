import {GET_CALENDARS, CREATE_CALENDAR} from '../types'

const handlers = {
    [GET_CALENDARS] : (state, action) => {
        if (action.payload.length) {
            return action.payload
        }
    },
    [CREATE_CALENDAR] : (state, action) => {
        return action.payload
    },
    DEFAULT : state => state
}

export const calendarReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}