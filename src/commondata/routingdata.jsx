import React from "react";
import Dashboard from "../components/dashboard/dashboard";
import UserProfile from "../components/user-profile/UserProfile";
import Company from "../components/company/Company";
import Employ from "../components/employ/Employ";
import HomePage from "../components/homepage/HomePage";
import Plans from "../components/plans/Plans";
import ViewPlan from "../components/plans/ViewPlan";
import EditPlan from "../components/plans/EditView";
import AddPlan from "../components/plans/AddPlan";
import ViewContactUs from "../components/company/ViewContactUs";
import BlogCategory from "../components/blog-category/BlogCategory";
import Blog from "../components/Blogs";
import AddBlogs from "../components/blogs/AddBlogs";
import { Edit } from "@mui/icons-material";
import EditBlogs from "../components/blogs/EditBlogs";
import ViewBlogs from "../components/blogs/ViewBlogs";
import News from "../components/news/News";
import AddNews from "../components/news/AddNews";
import EditNews from "../components/news/EditNews";
import ViewNews from "../components/news/ViewNews";

export const RouterData = [
  { path: `${import.meta.env.BASE_URL}/dashboard`, element: <Dashboard /> },
  { path: `${import.meta.env.BASE_URL}/contact-us`, element: <Company /> },
  { path: `${import.meta.env.BASE_URL}/view-contact/:id`, element: <ViewContactUs /> },
  { path: `${import.meta.env.BASE_URL}/blog-categories`, element: <BlogCategory /> },
  { path: `${import.meta.env.BASE_URL}/blog`, element: <Blog /> },
  { path: `${import.meta.env.BASE_URL}/add-blog`, element: <AddBlogs /> },
  { path: `${import.meta.env.BASE_URL}/view-blog/:id`, element: <ViewBlogs /> },
  { path: `${import.meta.env.BASE_URL}/edit-blog/:id`, element: <EditBlogs /> },


  { path: `${import.meta.env.BASE_URL}/news`, element: <News /> },
  { path: `${import.meta.env.BASE_URL}/add-news`, element: <AddNews /> },
  { path: `${import.meta.env.BASE_URL}/edit-news/:id`, element: <EditNews /> },
  { path: `${import.meta.env.BASE_URL}/view-news/:id`, element: <ViewNews /> },
  






  { path: `${import.meta.env.BASE_URL}/blog-tags`, element: <Employ /> },
  { path: `${import.meta.env.BASE_URL}/profile`, element: <UserProfile /> },
  { path: `${import.meta.env.BASE_URL}/home-page`, element: <HomePage /> },
  { path: `${import.meta.env.BASE_URL}/plans`, element: <Plans /> },
  { path: `${import.meta.env.BASE_URL}/view-plan/:id`, element: <ViewPlan /> },
  { path: `${import.meta.env.BASE_URL}/edit-plan/:id`, element: <EditPlan /> },
  { path: `${import.meta.env.BASE_URL}/add-plan`, element: <AddPlan /> },

]