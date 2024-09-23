import React, { Fragment, useState, useEffect } from "react";
import { MENUITEMS } from "../../commondata/sidemenu";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Imagesdata } from "../../commondata/commonimages";
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/allModalSlice";

let history = [];
const Sidebar = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const location = useLocation();
  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  const getUrl = location.pathname
  const updatedUrl = getUrl.replace(id, '');

  useEffect(() => {
    history.push(location.pathname);
    if (history.length > 2) {
      history.shift();
    }
    let mainContent = document.querySelector(".main-content");

    mainContent.addEventListener("click", mainContentClickFn);

    return () => {
      mainContent.removeEventListener("click", mainContentClickFn);
    };
  }, [location, mainContentClickFn, setNavActive]);

  useEffect(() => {
    setNavActive(location.pathname.endsWith("/") ? location.pathname.slice(0, -1) : location.pathname);

    if (
      document.body.classList.contains("horizontal") && window.innerWidth >= 992
    );
  }, [location]);

  if (document.querySelector("body")?.classList.contains("horizontal")) {

  }
  function mainContentClickFn() {
    if (
      document.body.classList.contains("horizontal") && window.innerWidth >= 992
    );
  }
  function setNavActive(pathname) {
    if (MENUITEMS) {
      MENUITEMS.filter((mainlevel) => {
        if (mainlevel.Items) {
          mainlevel.Items.filter((items) => {
            items.active = false;
            items.selected = false;
            if (pathname === "/") {
              pathname = "/dashboard";
            }
            if (pathname === items.path || updatedUrl == items.viewPath || updatedUrl == items.editPath || updatedUrl === items.addNewPath || updatedUrl === items.viewWithVariantPath || updatedUrl === items.deletedWithVariantPath || updatedUrl === items.editWithVariantPath || pathname === items.addwithvariantPath || pathname === items.deletedPath) {
              items.active = true;
              items.selected = true;
            }
            else if (items.children) {
              items.children.filter((submenu) => {
                submenu.active = false;
                submenu.selected = false;
                if (pathname == submenu.path || updatedUrl == submenu.path || updatedUrl == submenu.viewPath || updatedUrl == submenu.editPath || updatedUrl === submenu.addNewPath || updatedUrl === submenu.deletedPath) {
                  items.active = true;
                  items.selected = true;
                  submenu.active = true;
                  submenu.selected = true;
                }
                else if (submenu.children) {
                  submenu.children.filter((submenu1) => {
                    submenu1.active = false;
                    submenu1.selected = false;
                    if (pathname === submenu1.path) {
                      items.active = true;
                      items.selected = true;
                      submenu.active = true;
                      submenu.selected = true;
                      submenu1.active = true;
                      submenu1.selected = true;
                    }
                    return submenu1;
                  });
                }
                return submenu;

              })
            }
            return items;
          })
        }
        setMainMenu((arr) => [...arr]);
        if (document.body.classList.contains('horizontal-hover')) {
          clearMenuActive();
        }
        return mainlevel;
      });
    }
  }

  function toggletNavActive(item) {
    if (
      !document.body.classList.contains('horizontal-hover') || window.innerWidth < 992
    ) {
      if (!item.active) {
        MENUITEMS.filter((mainlevel) => {
          if (mainlevel.Items) {
            mainlevel.Items.filter(sublevel => {
              sublevel.active = false;
              if (item === sublevel) {
                sublevel.active = true;
              }
              if (sublevel.children) {
                sublevel.children.filter((sublevel1) => {
                  sublevel1.active = false;
                  if (item === sublevel1) {
                    sublevel.active = true;
                    sublevel1.active = true;
                  }
                  if (sublevel1.children) {
                    sublevel1.children.filter(sublevel2 => {
                      sublevel2.active = false;
                      if (item === sublevel2) {
                        sublevel.active = true;
                        sublevel1.active = true;
                        sublevel2.active = true;
                      }
                      if (sublevel2.children) {
                        sublevel2.children.filter(sublevel3 => {
                          sublevel3.active = false;
                          if (item === sublevel3) {
                            sublevel.active = true;
                            sublevel1.active = true;
                            sublevel2.active = true;
                            sublevel3.active = true;
                          }
                          return sublevel2;
                        });
                      }
                      return sublevel2;
                    });
                  }
                  return sublevel1;
                });
              }
              return sublevel;
            });
          }
          return mainlevel;
        });
      }
      else {
        item.active = !item.active;
      }
    }
    setMainMenu(MENUITEMS => [...MENUITEMS]);
  }
  function clearMenuActive() {
    MENUITEMS.filter((mainlevel) => {
      if (mainlevel.Items) {
        mainlevel.Items.filter((sublevel) => {
          sublevel.active = false;
          if (sublevel.children) {
            sublevel.children.filter((sublevel1) => {
              sublevel1.active = false;
              if (sublevel1.children) {
                sublevel1.children.filter((sublevel2) => {
                  sublevel2.active = false;
                  return sublevel2;
                });
              }
              return sublevel1;
            });
          }
          return sublevel;
        });
      }
      return mainlevel;
    });
    setMainMenu((arr) => [...arr]);
  }

  //Hover effect
  function Onhover() {
    if (document.querySelector(".app")?.classList.contains("sidenav-toggled"))
      document.querySelector(".app")?.classList.add("sidenav-toggled-open");

  }
  function Outhover() {
    document.querySelector(".app")?.classList.remove("sidenav-toggled-open");
  }

  return (
    <>
      <div className="sticky">
        <div className="app-sidebar__overlay"></div>
        <aside
          className="app-sidebar"
          onMouseOver={() => Onhover()}
          onMouseOut={() => Outhover()}
        >
          <PerfectScrollbar options={{ suppressScrollX: true, useBothWheelAxes: false }}>
            <div className="header side-header">
              <Link
                to={`${import.meta.env.BASE_URL}dashboard/`}
                className="header-brand1"
              >
                <img
                  src={Imagesdata("mainLogo1")}
                  className="header-brand-img desktop-logo"
                  alt={"logo"}
                />
                <img
                  src={Imagesdata("mainLogo1")}
                  className="header-brand-img toggle-logo"
                  alt={"logo-1"}
                />
                <img
                  src={Imagesdata("mainLogo1")}
                  className="header-brand-img light-logo"
                  alt={"logo-2"}
                />
                <img
                  src={Imagesdata("mainLogo1")}
                  className="header-brand-img light-logo1"
                  alt={"logo-3"}
                />
              </Link>
            </div>
            <div className="main-sidemenu">
              <div className="slide-left disabled" id="slide-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#7b8191"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
                </svg>
              </div>
              <div className="slide-leftRTL disabled" id="slide-leftRTL">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#7b8191"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
                </svg>
              </div>
              <ul className="side-menu" id="sidebar-main">
                {MENUITEMS.map((levelone) => (

                  <Fragment key={Math.random()}>
                    {levelone && levelone.Items && levelone.Items.length > 0 ? (
                      levelone.Items.map((menuItem, i) => (
                        <li
                          className={`slide ${menuItem.active ? "is-expanded" : ""}`}
                          key={i}
                        >
                          {menuItem.type === "link" ? (
                            <Link
                              to={menuItem.path + "/"}
                              className={`side-menu__item ${menuItem.selected ? "active" : ""}`}
                              onClick={() => {
                                setNavActive(menuItem);
                                toggletNavActive(menuItem);
                              }}
                            >
                              <i className={`side-menu__icon fe fe-${menuItem.icon}`}></i>
                              <span className="side-menu__label">{menuItem.title}</span>
                              {menuItem.badge ? (
                                <label className={`${menuItem.badge} side-badge`}>
                                  {menuItem.badgetxt}
                                </label>
                              ) : (
                                ""
                              )}
                            </Link>
                          ) : (
                            <Link
                              className={`side-menu__item ${menuItem.selected ? "active" : ""}`}
                              onClick={() => {
                                dispatch(openModal({ componentName: "PaypalCrediantial" }))
                              }}
                            >
                              <i className={`side-menu__icon fe fe-${menuItem.icon}`}></i>
                              <span className="side-menu__label">{menuItem.title}</span>
                              {menuItem.badge ? (
                                <label className={`${menuItem.badge} side-badge`}>
                                  {menuItem.badgetxt}
                                </label>
                              ) : (
                                ""
                              )}
                            </Link>
                          )}

                          {menuItem.type === "sub" ? (
                            <Link
                              to={menuItem.path + "/"}
                              className={`side-menu__item ${menuItem.selected ? "active" : ""}`}
                              onClick={(event) => {
                                event.preventDefault();
                                toggletNavActive(menuItem);
                              }}
                            >
                              <i className={`side-menu__icon fe fe-${menuItem.icon}`}></i>
                              <span className="side-menu__label">{menuItem.title}</span>
                              {menuItem.badge ? (
                                <label className={`${menuItem.badge} side-badge`}>
                                  {menuItem.badgetxt}
                                </label>
                              ) : (
                                ""
                              )}
                              <i className={`${menuItem.background} fa angle fa-angle-right `}></i>
                            </Link>
                          ) : (
                            ""
                          )}
                          {menuItem.children ? (
                            <ul
                              className={`slide-menu ${menuItem.active ? "open" : " "}`}
                              style={
                                menuItem.active
                                  ? {
                                    opacity: 1,
                                    transition: "opacity 500ms ease-in",
                                    display: "block",
                                  }
                                  : { display: "none" }
                              }
                            >
                              {menuItem.children.map((childrenItem, index) => {
                                return (
                                  <li
                                    key={index}
                                    className={`sub-slide ${childrenItem.active ? "is-expanded" : ""
                                      }`}
                                  >
                                    {childrenItem.type === "sub" ? (
                                      <Link
                                        to="#"
                                        className={`sub-side-menu__item ${childrenItem.selected ? "active" : "is-expanded"
                                          }`}
                                        onClick={(event) => {
                                          event.preventDefault();
                                          toggletNavActive(childrenItem);
                                        }}
                                      >
                                        <span className="sub-side-menu__label">
                                          {childrenItem.title}
                                        </span>
                                        {childrenItem.active ? (
                                          <i className="sub-angle  fa fa-angle-right"></i>
                                        ) : (
                                          <i className="sub-angle fa fa-angle-right"></i>
                                        )}
                                      </Link>
                                    ) : (
                                      ""
                                    )}
                                    {childrenItem.type === "link" ? (
                                      <Link
                                        to={childrenItem.path + "/"}
                                        className={`slide-item ${childrenItem.active ? "active" : "	 "
                                          }`}
                                        onClick={() => toggletNavActive(childrenItem)}
                                      >
                                        {childrenItem.title}
                                      </Link>
                                    ) : (
                                      ""
                                    )}
                                    {childrenItem.children ? (
                                      <ul
                                        className={`sub-slide-menu ${menuItem.active ? "" : "open"
                                          }`}
                                        style={
                                          childrenItem.active
                                            ? { display: "block" }
                                            : { display: "none" }
                                        }
                                      >
                                        {childrenItem.children.map((childrenSubItem, key) => (
                                          <li
                                            key={key}
                                            className={`${childrenSubItem.active ? "is-expanded" : ""
                                              }`}
                                          >
                                            {childrenSubItem.type === "link" ? (
                                              <Link
                                                to={childrenSubItem.path + "/"}
                                                className={`sub-slide-item ${childrenSubItem.selected ? "active" : " "
                                                  }`}
                                                onClick={() =>
                                                  toggletNavActive(childrenSubItem)
                                                }
                                              >
                                                {childrenSubItem.title}
                                              </Link>
                                            ) : (
                                              ""
                                            )}
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      ""
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            ""
                          )}
                        </li>
                      ))
                    ) : (
                      ""
                    )}

                  </Fragment>
                ))}
              </ul>
              <div className="slide-right" id="slide-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#7b8191"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
                </svg>
              </div>
              <div className="slide-rightRTL" id="slide-rightRTL">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#7b8191"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
                </svg>
              </div>
            </div>
          </PerfectScrollbar>
        </aside>
      </div>
    </>
  );
};
export default Sidebar;