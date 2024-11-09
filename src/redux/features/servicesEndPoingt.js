import { catalogueSlice } from "../services/catalogueSlice";

export const serviceEndPoint = catalogueSlice.injectEndpoints({
    endpoints: (builder) => ({

        getAllServices: builder.query({
            query: (organization_id) => `/all-services?organizationId=${organization_id}`
        }),
        getServices: builder.query({
            query: (organization_id) => `/get-service/${organization_id}`
        }),
        deleteServices: builder.mutation({
            query: (queryId) => ({
                url: `/delete-service/${queryId}`,
                method: "DELETE",
            })
        }),
        addServices: builder.mutation({
            query: (formData) => ({
                url: `/add-service`,
                method: "POST",
                body: formData,
            })
        }),
        editServices: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/edit-service/${id}`,
                method: "PUT",
                body: formData,
            })
        }),


    })
})

export const { useGetAllServicesQuery, useDeleteServicesMutation, useAddServicesMutation, useGetServicesQuery, useEditServicesMutation } = serviceEndPoint