import { apiSlice } from "./apiSlice";


const BASE_URL = '/api/admin'


export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        adminLogin:builder.mutation({
            query:(data)=>({
                url:`${BASE_URL}/admin-login`,
                method:'POST',
                body:data
            })
        }),
        getUsers:builder.mutation({
            query:()=>({
                url:`${BASE_URL}/get-users`,    
                method:'GET'
            })
        }),
        blockAndUnblockUser:builder.mutation({
            query:(data)=>({
                url:`${BASE_URL}/block-user`,    
                method:'PATCH',
                body:data
            })
        }),

    })
})


export const {useAdminLoginMutation,useGetUsersMutation,useBlockAndUnblockUserMutation} = adminApiSlice















