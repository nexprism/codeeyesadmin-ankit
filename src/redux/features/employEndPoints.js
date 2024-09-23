import { Login } from "@mui/icons-material";
import { catalogueSlice } from "../services/catalogueSlice";

export const employendPoints = catalogueSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllEmploy: builder.query({
            query: () => `/get-all-users`
        }),
        getPaypal: builder.query({
            query: () => `/get-paypal-credientials`
        }),
        addUpdate: builder.mutation({
            query: (formData) => ({
                url: `/add-update-credientials`,
                body: formData,
                method: "POST",
            })
        })

    })
})

export const { useGetAllEmployQuery, useGetPaypalQuery, useAddUpdateMutation } = employendPoints