import { catalogueSlice } from "../services/catalogueSlice";

export const textTestimonialEndPoint = catalogueSlice.injectEndpoints({
    endpoints: (builder) => ({

        getAllTextTestimonial: builder.query({
            query: (organization_id) => `/all-testimonial-text?organizationId=${organization_id}`
        }),
        getTextTestimonial: builder.query({
            query: (organization_id) => `/get-testimonial-text/${organization_id}`
        }),
        deleteTextTestimonial: builder.mutation({
            query: (queryId) => ({
                url: `/delete-testimonial-text/${queryId}`,
                method: "DELETE",
            })
        }),
        addTextTestimonial: builder.mutation({
            query: (formData) => ({
                url: `/add-testimonial-text`,
                method: "POST",
                body: formData,
            })
        }),
        editTextTestimonial: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/edit-testimonial-text/${id}`,
                method: "PUT",
                body: formData,
            })
        }),


    })
})

export const { useGetAllTextTestimonialQuery, useDeleteTextTestimonialMutation, useAddTextTestimonialMutation, useGetTextTestimonialQuery, useEditTextTestimonialMutation } = textTestimonialEndPoint