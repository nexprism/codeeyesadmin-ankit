import { Login } from "@mui/icons-material";
import { catalogueSlice } from "../services/catalogueSlice";

export const companyendPoints = catalogueSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompanies: builder.query({
      query: (organizationId) => `/get-all-contact-us/?organizationId=${organizationId}`,
    }),
    getSingleContactUs: builder.query({
      query: (contactId) => `/get-contact-us/${contactId}`,
    }),

    getBlogTags: builder.query({
      query: (organizationId) => `/get-blog-tag/?organizationId=${organizationId}`,
    }),

    addBlogTags: builder.mutation({
      query: ({ blogData, organization }) => ({
        url: `/add-blog-tag/?organizationId=${organization}`,
        method: "POST",
        body: blogData,
      }),
    }),
    editBlogTags: builder.mutation({
      query: ({ blogTagsId, blogtagsData }) => ({
        url: `/edit-blog-tag/${blogTagsId}`,
        method: "PUT",
        body: blogtagsData,
      }),
    }),
    getBlogTagsId: builder.query({
      query: (blogTagsId) => `/get-blog-tag/${blogTagsId}`,
    }),

    deleteBlogTags: builder.mutation({
      query: (blogTagsId) => ({
        url: `/delete-blog-tag/${blogTagsId}`,
        method: "DELETE",
      }),
    }),

    getBlogCategories: builder.query({
      query: (organizationId) => `/get-blog-category/?organizationId=${organizationId}`,
    }),
    getSingleBlogCategories: builder.query({
      query: (blogCategoryId) => `/get-blog-category/${blogCategoryId}`,
    }),
    addBlogCategories: builder.mutation({
      query: ({ blogCategoryData, organization }) => ({
        url: `/add-blog-category/?organizationId=${organization}`,
        method: "POST",
        body: blogCategoryData,
      }),
    }),
    editBlogCategories: builder.mutation({
      query: ({ blogCategoryData, blogCategoryId }) => ({
        url: `/edit-blog-category/${blogCategoryId}`,
        method: "PUT",
        body: blogCategoryData,
      }),
    }),
    deleteBlogCategories: builder.mutation({
      query: (blogCategoryId) => ({
        url: `/delete-blog-category/${blogCategoryId}`,
        method: "DELETE",
      }),
    }),
    deleteContactUs: builder.mutation({
      query: (contactUsId) => ({
        url: `/delete-contact-us/${contactUsId}`,
        method: "DELETE",
      }),
    }),

    getBlog: builder.query({
      query: (organizationId) => `/get-blog/?organizationId=${organizationId}`,
    }),
    getSingleBlog: builder.query({
      query: (blogCategoryId) => `/get-blog/${blogCategoryId}`,
    }),
    addBlog: builder.mutation({
      query: ({ blogCategoryData, organization }) => ({
        url: `/add-blog/?organizationId=${organization}`,
        method: "POST",
        body: blogCategoryData,
      }),
    }),
    editBlog: builder.mutation({
      query: ({ blogCategoryData, blogCategoryId }) => ({
        url: `/edit-blog/${blogCategoryId}`,
        method: "PUT",
        body: blogCategoryData,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (blogCategoryId) => ({
        url: `/delete-blog/${blogCategoryId}`,
        method: "DELETE",
      }),
    }),
    getNews: builder.query({
      query: (organizationId) => `/all-news/?organizationId=${organizationId}`,
    }),
    getSingleNews: builder.query({
      query: (blogCategoryId) => `/get-news/${blogCategoryId}`,
    }),
    addNews: builder.mutation({
      query: ({ blogCategoryData, organization }) => ({
        url: `/add-news/?organizationId=${organization}`,
        method: "POST",
        body: blogCategoryData,
      }),
    }),
    editNews: builder.mutation({
      query: ({ blogCategoryData, blogCategoryId }) => ({
        url: `/edit-news/${blogCategoryId}`,
        method: "PUT",
        body: blogCategoryData,
      }),
    }),
    deleteNews: builder.mutation({
      query: (blogCategoryId) => ({
        url: `/delete-news/${blogCategoryId}`,
        method: "DELETE",
      }),
    }),

    getAllPlans: builder.query({
      query: () => `/get-all-plan`,
    }),
    getSinglePlan: builder.query({
      query: (planId) => `/get-plan/${planId}`,
    }),
    editPlan: builder.mutation({
      query: ({ planId, formData }) => ({
        url: `/edit-plan/${planId}`,
        body: formData,
        method: "PUT",
      }),
    }),
    addPlan: builder.mutation({
      query: (formData) => ({
        url: `/add-plan`,
        body: formData,
        method: "POST",
      }),
    }),
    deletPlan: builder.mutation({
      query: (planId) => ({
        url: `/delete-plan/${planId}`,
        method: "DELETE",
      }),
    }),

    addLogo: builder.mutation({
      query: ({ blogCategoryData, organization }) => ({
        url: `/add-client-logo/?organizationId=${organization}`,
        method: "POST",
        body: blogCategoryData,
      }),
    }),
    getLogo: builder.query({
      query: (organizationId) => `/all-client-logo/?organizationId=${organizationId}`,
    }),
    deleteLogo: builder.mutation({
      query: (blogCategoryId) => ({
        url: `/delete-logo/${blogCategoryId}`,
        method: "DELETE",
      }),
    }),
    getSingleLogo: builder.query({
      query: (blogCategoryId) => `/get-client-logo/${blogCategoryId}`,
    }),
    editLogo: builder.mutation({
      query: ({ blogCategoryData, blogCategoryId }) => ({
        url: `/edit-client-logo/${blogCategoryId}`,
        method: "PUT",
        body: blogCategoryData,
      }),
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetSingleNewsQuery,
  useAddNewsMutation,
  useEditNewsMutation,
  useDeleteNewsMutation,
  useGetAllCompaniesQuery,
  useGetBlogTagsQuery,
  useGetBlogTagsIdQuery,
  useEditBlogTagsMutation,
  useDeleteBlogTagsMutation,
  useGetBlogCategoriesQuery,
  useGetSingleBlogCategoriesQuery,
  useAddBlogCategoriesMutation,
  useEditBlogCategoriesMutation,
  useDeleteBlogCategoriesMutation,
  useDeleteContactUsMutation,
  useGetBlogQuery,
  useDeleteBlogMutation,
  useAddBlogMutation,
  useGetSingleBlogQuery,
  useEditBlogMutation,
  useGetAllPlansQuery,
  useGetSinglePlanQuery,
  useEditPlanMutation,
  useAddPlanMutation,
  useDeletPlanMutation,
  useGetSingleContactUsQuery,
  useAddBlogTagsMutation,
  useAddLogoMutation,
  useGetLogoQuery,
  useDeleteLogoMutation,
  useGetSingleLogoQuery,
  useEditLogoMutation,
} = companyendPoints;
