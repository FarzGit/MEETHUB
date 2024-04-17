import { createSlice } from '@reduxjs/toolkit'

export interface ModalState {
    value: boolean
}

const initialState: ModalState = {
    value: false,
}

export const OtpSlice = createSlice({
    name: 'OtpModal',
    initialState,
    reducers: {
        openOtpModal: (state) => {
            console.log(' reducer entered')
            state.value = true
        },
        closeOtpModal: (state) => {
            
            state.value = false
        },

    },
})

// Action creators are generated for each case reducer function
export const { openOtpModal, closeOtpModal } = OtpSlice.actions

export default OtpSlice.reducer