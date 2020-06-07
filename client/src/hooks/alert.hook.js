import {useCalback} from 'react'

export const useAlert = () => {
    return useCalback(() => {
        const element = document.getElementById("alert");
        element.toast('show')
    },[])
}