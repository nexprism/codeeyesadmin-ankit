import { getCompanyList, getEmploylist, getHomePage, getPlans } from "../utils/routes";

export const MENUITEMS = [
  {
    menutitle: "MAIN",
    Items: [
      {
        path: `${import.meta.env.BASE_URL}dashboard`,
        icon: "home",
        type: "link",
        active: false,
        title: "Dashboard",
      },
    ],
  },
  {
    Items: [
      {
        path: `/contact-us`,
        icon: "phone-call",
        viewPath: ``,
        type: "link",
        active: false,
        title: "Contact Us",
      },
    ],
  },
  {
    Items: [
      {
        path: `/blog-tags`,
        icon: "tag",
        viewPath: ``,
        type: "link",
        active: false,
        title: "Blog Tags",
      },
    ],
  },
  {
    Items: [
      {
        path: `/blog-categories`,
        icon: "folder",
        viewPath: ``,
        type: "link",
        active: false,
        title: "Blog Category",
      },
    ],
  },
  {
    Items: [
      {
        path: `/blog`,
        icon: "book-open",
        viewPath: ``,
        type: "link",
        active: false,
        title: "Blog",
      },
    ],
  },
  {
    Items: [
      {
        path: `/news`,
        icon: "globe",
        viewPath: ``,
        type: "link",
        active: false,
        title: "News",
      },
    ],
  },
  {
    Items: [
      {
        path: `/logos`,
        icon: "grid",
        viewPath: ``,
        type: "link",
        active: false,
        title: "Client Logos",
      },
    ],
  },
  {
    Items: [
      {
        path: `/text-testimonials`,
        icon: "align-justify",
        viewPath: ``,
        type: "link",
        active: false,
        title: "Text Testimonials",
      },
    ],
  },
  {
    Items: [
      {
        path: `/video-testimonials`,
        icon: "video",
        viewPath: ``,
        type: "link",
        active: false,
        title: "Video Testimonials",
      },
    ],
  },
  {
    Items: [
      {
        path: `/home-logos`,
        icon: "image",
        viewPath: ``,
        type: "link",
        active: false,
        title: "Home Logos",
      },
    ],
  },
  {
    Items: [
      {
        path: `/services`,
        icon: "settings",
        viewPath: ``,
        type: "link",
        active: false,
        title: "Services",
      },
    ],
  },
  {
    Items: [
      {
        path: `/portfolios`,
        icon: "briefcase",
        viewPath: ``,
        type: "link",
        active: false,
        title: "Portfolios",
      },
    ],
  },
  {
    Items: [
      {
        path: `/email-footer`,
        icon: "mail",
        viewPath: ``,
        type: "link",
        active: false,
        title: "Email Footer",
      },
    ],
  },
  {
    Items: [
      {
        path: `/our-team`,
        icon: "user",
        viewPath: ``,
        type: "link",
        active: false,
        title: "Our Team",
      },
    ],
  },
];
