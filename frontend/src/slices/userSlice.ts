import { apiSlice } from "./apiSlice";

const BASE_URL = '/api/user'


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        register: builder.mutation({
            query: (data)=>({
                url: `${BASE_URL}/signUp`,
                method: 'POST',
                body: data
            })
        }),
        sendOtpTOMail: builder.mutation({
            query:(data)=>({
                url:`${BASE_URL}/sendEmail`,
                method:'POST',
                body:data
            })
        }),
        otpVerification:builder.mutation({
            query:(data)=>({
                url:`${BASE_URL}/verifyEmail`,
                method:'POST',
                body:data
            })
        }),
        userLogin:builder.mutation({
            query:(data)=>({
                url:`${BASE_URL}/login`,
                method:'POST',
                body:data
            })
        }),
        googleAuth:builder.mutation({
            query:(data)=>({
                url:`${BASE_URL}/googleAuth`,
                method:'POST',
                body:data
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${BASE_URL}/logout`,
                method:'POST'
            })
        })

    })
})

export const {useRegisterMutation,
            useSendOtpTOMailMutation,
            useOtpVerificationMutation,
            useUserLoginMutation,
            useGoogleAuthMutation,
            useLogoutMutation
} = userApiSlice