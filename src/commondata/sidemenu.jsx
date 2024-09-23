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
        title: "Dashboard",
      },
    ],
  },
  {
    Items: [
      {
        path: `/contact-us`,
        icon: "Contact Us",
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
        icon: "Blog Tags",
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
        icon: "Blog Category",
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
        icon: "Blog",
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
        icon: "News",
        viewPath: ``,
        type: "link",
        active: false,
        title: "News",
      },
    ],
  },
  // {
  //   Items: [
  //     {
  //       path: `${getPlans()}`,
  //       icon: "Plans",
  //       viewPath: ``,
  //       type: "link",
  //       active: false,
  //       title: "Plans",
  //     },
  //   ],
  // },
  // {
  //   Items: [
  //     {
  //       path: '',
  //       icon: "Crediantials",
  //       viewPath: ``,
  //       type: "button",
  //       active: false,
  //       title: "Credential",
  //     },
  //   ],
  // },
  // {
  //   Items: [
  //     {
  //       path: `${getHomePage()}`,
  //       icon: "Home Page",
  //       viewPath: ``,
  //       type: "link",
  //       active: false,
  //       title: "Home Page",
  //     },
  //   ],
  // },
]

