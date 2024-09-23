import { Login } from "@mui/icons-material";
import { catalogueSlice } from "../services/catalogueSlice";

export const adminAuthenticationendPoints = catalogueSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginEndPoint: builder.mutation({
            query: (loginBody) => ({
                url: `/login`,
                method: "POST",
                body: loginBody
            })
        }),
        getUser: builder.query({
            query: () => `/get-admin-profile`
        }),
        updateAdminProfile: builder.mutation({
            query: (formData) => ({
                url: `/update-admin`,
                method: "PUT",
                body: formData
            })
        }),
        changePassword: builder.mutation({
            query: (passwordData) => ({
                url: `/change-password`,
                method: "PUT",
                body: passwordData
            })
        })
    })
})

export const { useLoginEndPointMutation, useGetUserQuery, useUpdateAdminProfileMutation, useChangePasswordMutation } = adminAuthenticationendPoints