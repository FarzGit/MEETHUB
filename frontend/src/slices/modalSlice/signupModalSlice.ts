import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

export const signupModalSlice = createSlice({
    name: 'signupModal',
    initialState,
    reducers: {
        openSignupModal: (state) => {
            state.value = true
        },
        closeSignupModal: (state) => {
            console.log('entered')
            state.value = false
        },

    },
})

// Action creators are generated for each case reducer function
export const { openSignupModal, closeSignupModal } = signupModalSlice.actions

export default signupModalSlice.reducer