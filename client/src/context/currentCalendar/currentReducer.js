import {GET_CALENDAR} from '../types'

const handlers = {
    [GET_CALENDAR]: (state, {payload}) => {
        const cal = payload.calendar
        state = {...state, calendar: cal}
        return state
    },
    DEFAULT: state => state
}

export const currentReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}