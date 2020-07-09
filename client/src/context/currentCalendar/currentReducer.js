import {GET_CALENDAR, NEXT_YEAR, PAST_YEAR, ACTUAL_YEAR, GET_LEAVES} from '../types'

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
    [GET_LEAVES]: (state, {payload}) => {
        const leaves = payload
        state = {...state, leaves}
        return state
    },
    DEFAULT: state => state
}

export const currentReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}