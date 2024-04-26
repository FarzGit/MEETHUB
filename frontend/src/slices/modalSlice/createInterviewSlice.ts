import { createSlice } from '@reduxjs/toolkit'

export interface ModalState {
    value: boolean
}

const initialState: ModalState = {
    value: false,
}

export const createInterviewSlice = createSlice({
    name: 'createInterviewModal',
    initialState,
    reducers: {
        openInterviewModal: (state) => {
            console.log(' reducer entered')
            state.value = true
        },
        closeInterviewModal: (state) => {
            
            state.value = false
        },

    },
})

// Action creators are generated for each case reducer function
export const { openInterviewModal, closeInterviewModal } = createInterviewSlice.actions

export default createInterviewSlice.reducer