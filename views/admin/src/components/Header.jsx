import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LogoutButton from "./LogOutButton";



const menuItems = [
  { name: "Dashboard", icon: "bx bx-grid-alt", link: "/dashboard" },
  {
    name: "Master", icon: "bx bx-user", children: [
      { name: "Add Department", icon: "bx bx-plus", link: "/add-department" },
      { name: "Department List", icon: "bx bx-list-ul", link: "/department-list" },

       { name: "Add Designation", icon: "bx bx-plus", link: "/add-designation" },
      { name: "Designation List", icon: "bx bx-list-ul", link: "/designation-list" },

    ]
  },

  {
    name: "Service Master", icon: "bx bx-user", children: [
      { name: "Add Service", icon: "bx bx-plus", link: "/add-service" },
      { name: "Service List", icon: "bx bx-list-ul", link: "/service-list" },

    ]
  },
  


];

const Header = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [submenuOpenIndex, setSubmenuOpenIndex] = useState(null);
  const btnRef = useRef(null);
  const navListRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (btnRef.current) {
      if (isOpen) {
        btnRef.current.classList.replace("bx-menu", "bx-menu-alt-right");
      } else {
        btnRef.current.classList.replace("bx-menu-alt-right", "bx-menu");
      }
    }

    if (navListRef.current) {
      if (isOpen) {
        navListRef.current.classList.add("scroll");
      } else {
        navListRef.current.classList.remove("scroll");
      }
    }
  }, [isOpen]);

  const toggleSubmenu = (index) => {
    setSubmenuOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <div className="logo-details">
          <img
            src="/public/logo.png"  
            alt="Logo"
            className="sidebar-logo"
            style={{ width: "65%",  marginRight: "10px" }}
          />
{/* 
          <div className="logo_name">{isOpen && "Demo"}</div> */}
          <i
            className="bx bx-menu"
            id="btn"
            ref={btnRef}
            onClick={() => setIsOpen((prev) => !prev)}
            style={{ cursor: "pointer" }}
          ></i>
        </div>

        <ul className="nav-list" ref={navListRef}>


          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {!item.children ? (
                <li>
                  <Link to={item.link}>
                    <i className={item.icon}></i>
                    <span className="links_name">{item.name}</span>
                  </Link>
                  <span className="tooltip">{item.name}</span>
                </li>
              ) : (
                <li>
                  <div
                    className="submenu-toggle"
                    onClick={() => toggleSubmenu(index)}
                    style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                  >
                    <i className={item.icon}></i>
                    {isOpen && (
                      <>
                        <span className="links_name">{item.name}</span>
                        <i
                          className={`bx ${submenuOpenIndex === index
                              ? "bx-chevron-up"
                              : "bx-chevron-down"
                            }`}
                          style={{ marginLeft: "auto" }}
                        ></i>
                      </>
                    )}
                  </div>
                  <span className="tooltip">{item.name}</span>

                  {/* Submenu */}
                  {submenuOpenIndex === index && isOpen && (
                    <ul className="submenu" style={{ paddingLeft: "2rem" }}>
                      {item.children.map((subItem, subIdx) => (
                        <li key={subIdx}>
                          <Link to={subItem.link}>
                            <i className={subItem.icon}></i>
                            <span className="links_name">{subItem.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )}
            </React.Fragment>
          ))}

          {/* Profile */}
          <li className="profile">
            <div className="profile-details">
              {isOpen && (
                <div className="name_job">
                  <div className="name">John Doe</div>
                  <div className="job">@johndoe</div>
                </div>
              )}
            </div>
            <LogoutButton />``
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
