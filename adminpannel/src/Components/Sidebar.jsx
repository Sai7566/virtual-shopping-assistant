import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaSquarePlus } from 'react-icons/fa6';
import { MdFactCheck } from 'react-icons/md';
import { FaListAlt } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import logo from "../assets/logo.png";

const Sidebar = ({ setToken }) => {
  const { t } = useTranslation(); // Hook to access translation functions

  return (
    <div className='max-sm:flexCenter max-xs:pb-3 rounded bg-white pb-3 sm:w-1/5 sm:min-h-screen'>
      <div className='flex flex-col gap-y-6 max-sm:items-center sm:flex-col pt-4 sm:pt-14'>
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
           <img
              src={logo}
              alt="Virtual Shopping Assistant Logo"
              className="w-36 sm:w-44 object-contain" // ⬅️ Increased width
            />
        </Link>
        <LanguageSwitcher />
        <div className='flex sm:flex-col gap-x-5 gap-y-8 sm:pt-10'>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? "active-link" : "flexStart gap-x-2 sm:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl"
            }
          >
            <FaSquarePlus />
            <div className='hidden lg:flex'>{t('addItem')}</div> {/* Translated text */}
          </NavLink>
          <NavLink
            to={"/list"}
            className={({ isActive }) =>
              isActive ? "active-link" : "flexStart gap-x-2 sm:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl"
            }
          >
            <FaListAlt />
            <div className='hidden lg:flex'>{t('list')}</div> {/* Translated text */}
          </NavLink>
          <NavLink
            to={"/orders"}
            className={({ isActive }) =>
              isActive ? "active-link" : "flexStart gap-x-2 sm:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl"
            }
          >
            <MdFactCheck />
            <div className='hidden lg:flex'>{t('orders')}</div> {/* Translated text */}
          </NavLink>
          <div className='max-sm:ml-5 sm:mt-72'>
            <button
              onClick={() => setToken("")}
              className="flexStart gap-x-2 sm:pl-12 p-5 medium-15 cursor-pointer h-10 rounded-xl text-red-500"
            >
              <BiLogOut className='text-lg' />
              <div className='hidden lg:flex'>{t('logout')}</div> {/* Translated text */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

