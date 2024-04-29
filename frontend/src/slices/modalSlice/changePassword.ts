import { createSlice } from '@reduxjs/toolkit'

export interface ModalState {
    value: boolean
}

const initialState: ModalState = {
    value: false,
}

export const changePasswordSlice = createSlice({
    name: 'changePasswordModal',
    initialState,
    reducers: {
        openchangePasswordModal: (state) => {
            console.log(' reducer entered')
            state.value = true
        },
        closechangePasswordModal: (state) => {
            
            state.value = false
        },

    },
})

// Action creators are generated for each case reducer function
export const { openchangePasswordModal, closechangePasswordModal } = changePasswordSlice.actions

export default changePasswordSlice.reducer