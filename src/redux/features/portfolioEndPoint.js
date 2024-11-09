import { catalogueSlice } from "../services/catalogueSlice";

export const portfolioEndPoint = catalogueSlice.injectEndpoints({
    endpoints: (builder) => ({

        getAllPortfolio: builder.query({
            query: (organization_id) => `/all-portfolio?organizationId=${organization_id}`
        }),
        getPortfolio: builder.query({
            query: (organization_id) => `/get-portfolio/${organization_id}`
        }),
        deletePortfolio: builder.mutation({
            query: (queryId) => ({
                url: `/delete-portfolio/${queryId}`,
                method: "DELETE",
            })
        }),
        addPortfolio: builder.mutation({
            query: (formData) => ({
                url: `/add-portfolio`,
                method: "POST",
                body: formData,
            })
        }),
        editPortfolio: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/edit-portfolio/${id}`,
                method: "PUT",
                body: formData,
            })
        }),


    })
})

export const { useGetAllPortfolioQuery, useDeletePortfolioMutation, useAddPortfolioMutation, useGetPortfolioQuery, useEditPortfolioMutation } = portfolioEndPoint