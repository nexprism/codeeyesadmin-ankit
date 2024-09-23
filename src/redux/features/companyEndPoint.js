import { Login } from "@mui/icons-material";
import { catalogueSlice } from "../services/catalogueSlice";

export const companyendPoints = catalogueSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCompanies: builder.query({
            query: () => `/get-contact-us`
        }),
        getSingleContactUs: builder.query({
            query: (contactId) => `/get-contact-us/${contactId}`
        }),


        getBlogTags: builder.query({
            query: () => `/get-blog-tag`
        }),

        addBlogTags: builder.mutation({
            query: (blogData) => ({
                url: `/add-blog-tag`,
                method: "POST",
                body: blogData,
            })
        }),
        editBlogTags: builder.mutation({
            query: ({ blogTagsId, blogtagsData }) => ({
                url: `/edit-blog-tag/${blogTagsId}`,
                method: "PUT",
                body: blogtagsData
            })
        }),
        getBlogTagsId: builder.query({
            query: (blogTagsId) => `/get-blog-tag/${blogTagsId}`
        }),

        deleteBlogTags: builder.mutation({
            query: (blogTagsId) => ({
                url: `/delete-blog-tag/${blogTagsId}`,
                method: "DELETE",
            })
        }),

        getBlogCategories: builder.query({
            query: () => `/get-blog-category`
        }),
        getSingleBlogCategories: builder.query({
            query: (blogCategoryId) => `/get-blog-category/${blogCategoryId}`
        }),
        addBlogCategories: builder.mutation({
            query: (blogCategoryData) => ({
                url: `/add-blog-category`,
                method: "POST",
                body: blogCategoryData
            })
        }),
        editBlogCategories: builder.mutation({
            query: ({ blogCategoryData, blogCategoryId }) => ({
                url: `/edit-blog-category/${blogCategoryId}`,
                method: "PUT",
                body: blogCategoryData
            })
        }),
        deleteBlogCategories: builder.mutation({
            query: (blogCategoryId) => ({
                url: `/delete-blog-category/${blogCategoryId}`,
                method: "DELETE",
            })
        }),

        getBlog: builder.query({
            query: () => `/get-blog`
        }),
        getSingleBlog: builder.query({
            query: (blogCategoryId) => `/get-blog/${blogCategoryId}`
        }),
        addBlog: builder.mutation({
            query: (blogCategoryData) => ({
                url: `/add-blog`,
                method: "POST",
                body: blogCategoryData
            })
        }),
        editBlog: builder.mutation({
            query: ({ blogCategoryData, blogCategoryId }) => ({
                url: `/edit-blog/${blogCategoryId}`,
                method: "PUT",
                body: blogCategoryData
            })
        }),
        deleteBlog: builder.mutation({
            query: (blogCategoryId) => ({
                url: `/delete-blog/${blogCategoryId}`,
                method: "DELETE",
            })
        }),








        getAllPlans: builder.query({
            query: () => `/get-all-plan`
        }),
        getSinglePlan: builder.query({
            query: (planId) => `/get-plan/${planId}`
        }),
        editPlan: builder.mutation({
            query: ({ planId, formData }) => ({
                url: `/edit-plan/${planId}`,
                body: formData,
                method: "PUT",
            })
        }),
        addPlan: builder.mutation({
            query: (formData) => ({
                url: `/add-plan`,
                body: formData,
                method: "POST",
            })
        }),
        deletPlan: builder.mutation({
            query: (planId) => ({
                url: `/delete-plan/${planId}`,
                method: "DELETE",
            })
        }),

    })
})

export const { useGetAllCompaniesQuery, useGetBlogTagsQuery, useGetBlogTagsIdQuery, useEditBlogTagsMutation, useDeleteBlogTagsMutation, useGetBlogCategoriesQuery, useGetSingleBlogCategoriesQuery, useAddBlogCategoriesMutation, useEditBlogCategoriesMutation, useDeleteBlogCategoriesMutation, useGetBlogQuery, useDeleteBlogMutation, useAddBlogMutation, useGetSingleBlogQuery, useEditBlogMutation, useGetAllPlansQuery, useGetSinglePlanQuery, useEditPlanMutation, useAddPlanMutation, useDeletPlanMutation, useGetSingleContactUsQuery, useAddBlogTagsMutation } = companyendPoints