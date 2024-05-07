/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "./apiSlice";

const BASE_URL = '/api/user'


export const userApiSlice:any = apiSlice.injectEndpoints({
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
        }),
        forgotPassword:builder.mutation({
            query:(data)=>({
                url:`${BASE_URL}/forgot-password`,
                method:'POST',
                body:data
            })
        }),
        sendForgetEmailOtp:builder.mutation({
            query:(data)=>({
                url:`${BASE_URL}/send-Forget-Pass-Otp`,
                method:'POST',
                body:data
            })
        }),
        payment:builder.mutation({
            query:(data)=>({
                url:`${BASE_URL}/payment`,
                method:'POST',
                body:data
            })
        }),
        confirmPayment:builder.mutation({
            query:(data)=>({
                url:`${BASE_URL}/payment`,
                method:'POST',
                body:data
            })
        }),


    })
})

export const {useRegisterMutation,
            useSendOtpTOMailMutation,
            useOtpVerificationMutation,
            useUserLoginMutation,
            useGoogleAuthMutation,
            useLogoutMutation,
            useForgotPasswordMutation,
            useSendForgetEmailOtpMutation,
            usePaymentMutation,
            useConfirmPaymentMutation
} = userApiSlice