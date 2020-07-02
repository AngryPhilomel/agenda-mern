import {GET_CALENDAR, NEXT_YEAR, PAST_YEAR, ACTUAL_YEAR} from '../types'

const handlers = {
    [GET_CALENDAR]: (state, {payload}) => {
        const cal = payload.calendar
        state = {...state, calendar: cal, date: Date.now()}
        return state
    },
    [NEXT_YEAR]: (state, {payload}) => {
        const date = payload
        state = {...state, date}
        return state
    },
    [PAST_YEAR]: (state, {payload}) => {
        const date = payload
        state = {...state, date}
        return state
    },
    [ACTUAL_YEAR]: (state, {payload}) => {
        const date = payload
        state = {...state, date}
        return state
    }, 
    DEFAULT: state => state
}

export const currentReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}