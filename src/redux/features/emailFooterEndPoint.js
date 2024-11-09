import { catalogueSlice } from "../services/catalogueSlice";

export const emailFooterEndPoint = catalogueSlice.injectEndpoints({
    endpoints: (builder) => ({

        getAllEmailFooter: builder.query({
            query: (organization_id) => `/all-footer-email?organizationId=${organization_id}`
        }),
        getEmailFooter: builder.query({
            query: (organization_id) => `/get-footer-email/${organization_id}`
        }),
        deleteEmailFooter: builder.mutation({
            query: (queryId) => ({
                url: `/delete-footer-email/${queryId}`,
                method: "DELETE",
            })
        }),
        addEmailFooter: builder.mutation({
            query: (formData) => ({
                url: `/add-footer-email`,
                method: "POST",
                body: formData,
            })
        }),
        editEmailFooter: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/edit-footer-email/${id}`,
                method: "PUT",
                body: formData,
            })
        }),


    })
})

export const { useGetAllEmailFooterQuery, useDeleteEmailFooterMutation, useAddEmailFooterMutation, useGetEmailFooterQuery, useEditEmailFooterMutation } = emailFooterEndPoint