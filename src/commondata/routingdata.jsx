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
import Logos from "../components/logos/Logos";
import Addlogo from "../components/logos/AddLogo";
import EditLogo from "../components/logos/EditLogo";
import TextTestimonial from "../components/text-testimonial/TextTestimonial";
import AddTextTestimonial from "../components/text-testimonial/AddTextTestimonial";
import EditTextTestimonial from "../components/text-testimonial/EditTestTestimonial";
import ViewTextTestimonial from "../components/text-testimonial/ViewTextTestimonialLogo";
import VideoTestimonial from "../components/VideoTestimonials/ViewTestimonial";
import AddVideoTestimonial from "../components/VideoTestimonials/AddViewTestimonial.jsx";
import EditVideoTestimonial from "../components/VideoTestimonials/EditViewTestimonial.jsx.jsx";
import ViewVideoTestimonial from "../components/VideoTestimonials/ViewViewTestimonial";
import HomeLogos from "../components/home-logo/HomeLogos.jsx";
import Addhomelogo from "../components/home-logo/AddHomeLogo.jsx";
import ViewHomeLogo from "../components/home-logo/ViewHomeLogo.jsx";
import AddHomelogo from "../components/home-logo/AddHomeLogo.jsx";
import EditHomeLogo from "../components/home-logo/EditHomeLogo.jsx";
import Services from "../components/services/Services.jsx";
import AddServices from "../components/services/AddServices.jsx";
import EditServices from "../components/services/EditServices.jsx";
import ViewServices from "../components/services/ViewServices.jsx";
import Portfolio from "../components/portfolio/Portfolio.jsx";
import AddPortfolio from "../components/portfolio/AddPortfolio.jsx";
import EditPortFolio from "../components/portfolio/EditPortfolio.jsx";
import ViewPortfolio from "../components/portfolio/ViewPortfolio.jsx";
import ViewEmailFooter from "../components/email-footer/ViewEmailFooter.jsx";
import EditEmailFooter from "../components/email-footer/EditEmailFooter.jsx";
import AddEmailFooter from "../components/email-footer/AddEmailFooter.jsx";
import EmailFooter from "../components/email-footer/EmailFooter.jsx";
import OurTeam from "../components/our-teem/OurTeam.jsx";
import AddOurTeam from "../components/our-teem/AddOurTeam.jsx";
import EditOurTeam from "../components/our-teem/EditOurTeam.jsx";
import ViewOurTeam from "../components/our-teem/ViewOurTeam.jsx";

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

  { path: `${import.meta.env.BASE_URL}/logos`, element: <Logos /> },
  { path: `${import.meta.env.BASE_URL}/add-logo`, element: <Addlogo /> },
  { path: `${import.meta.env.BASE_URL}/edit-logo/:id`, element: <EditLogo /> },

  //text testimonials
  { path: `${import.meta.env.BASE_URL}/text-testimonials`, element: <TextTestimonial /> },
  { path: `${import.meta.env.BASE_URL}/add-text-textomonial`, element: <AddTextTestimonial /> },
  { path: `${import.meta.env.BASE_URL}/edit-text-textomonial/:id`, element: <EditTextTestimonial /> },
  { path: `${import.meta.env.BASE_URL}/view-text-textomonial/:id`, element: <ViewTextTestimonial /> },

  //video testimonials
  { path: `${import.meta.env.BASE_URL}/video-testimonials`, element: <VideoTestimonial /> },
  { path: `${import.meta.env.BASE_URL}/add-video-textomonial`, element: <AddVideoTestimonial /> },
  { path: `${import.meta.env.BASE_URL}/edit-video-textomonial/:id`, element: <EditVideoTestimonial /> },
  { path: `${import.meta.env.BASE_URL}/view-video-textomonial/:id`, element: <ViewVideoTestimonial /> },

  //home logo
  { path: `${import.meta.env.BASE_URL}/home-logos`, element: <HomeLogos /> },
  { path: `${import.meta.env.BASE_URL}/add-home-logos/`, element: <AddHomelogo /> },
  { path: `${import.meta.env.BASE_URL}/edit-home-logos/:id`, element: <EditHomeLogo /> },
  { path: `${import.meta.env.BASE_URL}/view-home-logos/:id`, element: <ViewHomeLogo /> },

  //Services
  { path: `${import.meta.env.BASE_URL}/services`, element: <Services /> },
  { path: `${import.meta.env.BASE_URL}/add-services/`, element: <AddServices /> },
  { path: `${import.meta.env.BASE_URL}/edit-services/:id`, element: <EditServices /> },
  { path: `${import.meta.env.BASE_URL}/view-services/:id`, element: <ViewServices /> },

  //portfolio
  { path: `${import.meta.env.BASE_URL}/portfolios`, element: <Portfolio /> },
  { path: `${import.meta.env.BASE_URL}/add-portfolio/`, element: <AddPortfolio /> },
  { path: `${import.meta.env.BASE_URL}/edit-portfolio/:id`, element: <EditPortFolio /> },
  { path: `${import.meta.env.BASE_URL}/view-portfolio/:id`, element: <ViewPortfolio /> },

  //email footer
  { path: `${import.meta.env.BASE_URL}/email-footer`, element: <EmailFooter /> },
  { path: `${import.meta.env.BASE_URL}/add-email-footer/`, element: <AddEmailFooter /> },
  { path: `${import.meta.env.BASE_URL}/edit-email-footer/:id`, element: <EditEmailFooter /> },
  { path: `${import.meta.env.BASE_URL}/view-email-footer/:id`, element: <ViewEmailFooter /> },

  //our team
  { path: `${import.meta.env.BASE_URL}/our-team`, element: <OurTeam /> },
  { path: `${import.meta.env.BASE_URL}/add-our-team/`, element: <AddOurTeam /> },
  { path: `${import.meta.env.BASE_URL}/edit-our-team/:id`, element: <EditOurTeam /> },
  { path: `${import.meta.env.BASE_URL}/view-our-team/:id`, element: <ViewOurTeam /> },
];
