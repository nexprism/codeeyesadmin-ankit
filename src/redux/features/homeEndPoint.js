import { catalogueSlice } from "../services/catalogueSlice";

export const HomePageendPoints = catalogueSlice.injectEndpoints({
    endpoints: (builder) => ({

        getHomePage: builder.query({
            query: () => `/home`
        }),
        addHomePage: builder.mutation({
            query: (formData) => ({
                url: `/add-home`,
                method: "POST",
                body: formData
            })
        }),

    })
})

export const { useGetHomePageQuery, useAddHomePageMutation, } = HomePageendPoints