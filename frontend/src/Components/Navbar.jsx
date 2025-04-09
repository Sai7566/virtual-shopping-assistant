import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";


const Navbar = ({ containerStyles, closeMenu }) => {
  const { t } = useTranslation();

  const navlinks = [
    { path: "/", title: t("Home") },
    { path: "/collection", title: t("Collection") },
    
    { path: "/product-satisfaction", title: t("ProductSatisfaction") },
    { path: "/about", title: t("About") },
  ];

  return (
    <nav
    className={`${containerStyles} flex items-center justify-center gap-6 bg-gradient-to-r from-white via-[#f1f5f9] to-white shadow-md rounded-full px-6 py-3 backdrop-blur-md`}
  >
  
      {navlinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          onClick={closeMenu}
          className={({ isActive }) =>
            `px-4 py-2 rounded-full transition duration-300 ${
              isActive ? "bg-secondary text-white" : "text-gray-800"
            }`
          }
        >
          {link.title}
        </NavLink>
      ))}

     
    </nav>
  );
};

export default Navbar;







