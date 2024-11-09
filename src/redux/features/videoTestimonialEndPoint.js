import { catalogueSlice } from "../services/catalogueSlice";

export const videoTestimonialEndPonits = catalogueSlice.injectEndpoints({
    endpoints: (builder) => ({

        getAllVideoTestimonial: builder.query({
            query: (organization_id) => `/all-testimonial-video?organizationId=${organization_id}`
        }),
        getVideoTestimonial: builder.query({
            query: (organization_id) => `/get-testimonial-video/${organization_id}`
        }),
        deleteVideoTestimonial: builder.mutation({
            query: (queryId) => ({
                url: `/delete-testimonial-video/${queryId}`,
                method: "DELETE",
            })
        }),
        addVideoTestimonial: builder.mutation({
            query: (formData) => ({
                url: `/add-testimonial-video`,
                method: "POST",
                body: formData,
            })
        }),
        editVideoTestimonial: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/edit-testimonial-video/${id}`,
                method: "PUT",
                body: formData,
            })
        }),


    })
})

export const { useGetAllVideoTestimonialQuery, useDeleteVideoTestimonialMutation, useAddVideoTestimonialMutation, useGetVideoTestimonialQuery, useEditVideoTestimonialMutation } = videoTestimonialEndPonits