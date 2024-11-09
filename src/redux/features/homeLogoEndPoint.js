import { catalogueSlice } from "../services/catalogueSlice";

export const homeLogoEndPoints = catalogueSlice.injectEndpoints({
    endpoints: (builder) => ({

        getAllHomeLogo: builder.query({
            query: (organization_id) => `/all-home-logo?organizationId=${organization_id}`
        }),
        GetHomeLogo: builder.query({
            query: (organization_id) => `/get-home-logo/${organization_id}`
        }),
        deleteHomeLogo: builder.mutation({
            query: (queryId) => ({
                url: `/delete-home-logo/${queryId}`,
                method: "DELETE",
            })
        }),
        addHomeLogo: builder.mutation({
            query: (formData) => ({
                url: `/add-home-logo`,
                method: "POST",
                body: formData,
            })
        }),
        editHomeLogo: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/edit-home-logo/${id}`,
                method: "PUT",
                body: formData,
            })
        }),


    })
})

export const { useGetAllHomeLogoQuery, useDeleteHomeLogoMutation, useAddHomeLogoMutation, useGetHomeLogoQuery, useEditHomeLogoMutation } = homeLogoEndPoints