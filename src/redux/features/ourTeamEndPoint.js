import { catalogueSlice } from "../services/catalogueSlice";

export const ourTeamEndPoint = catalogueSlice.injectEndpoints({
    endpoints: (builder) => ({

        getAllOurTeam: builder.query({
            query: (organization_id) => `/all-our-team?organizationId=${organization_id}`
        }),
        getOurTeam: builder.query({
            query: (organization_id) => `/get-our-team/${organization_id}`
        }),
        deleteOurTeam: builder.mutation({
            query: (queryId) => ({
                url: `/delete-our-team/${queryId}`,
                method: "DELETE",
            })
        }),
        addOurTeem: builder.mutation({
            query: (formData) => ({
                url: `/add-our-team`,
                method: "POST",
                body: formData,
            })
        }),
        editOurTeem: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/edit-our-team/${id}`,
                method: "PUT",
                body: formData,
            })
        }),


    })
})

export const { useGetAllOurTeamQuery, useDeleteOurTeamMutation, useAddOurTeemMutation, useGetOurTeamQuery, useEditOurTeemMutation } = ourTeamEndPoint