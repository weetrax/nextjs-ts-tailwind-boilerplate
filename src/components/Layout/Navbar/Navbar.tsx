import clsx from "clsx";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { ChangeEvent, Fragment, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { LayoutContainer } from "../Container/Container";
import { routes } from "@/routes";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type NavbarProps = {
  //
};

type NavbarNavigation = {
  name: string;
  href: string;
  hideIfAuth?: boolean;
};

const navigation: NavbarNavigation[] = [
  { name: "Home", href: routes.home },
  { name: "Portfolio", href: routes.portfolio },
  { name: "Login", href: routes.login, hideIfAuth: true },
  { name: "Register", href: routes.register, hideIfAuth: true },
];

const Navbar: React.FC<NavbarProps> = () => {
  /* Hooks */
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { user, logout } = useCurrentUser();
  const { t } = useTranslation("common");

  /* States */
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);

  /* Functions */
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    setLogoutLoading(true);
    logout((err) => {
      setLogoutLoading(false);
    });
  };

  /* Render */
  return (
    <Disclosure as="nav" className={"backdrop-filter backdrop-blur"}>
      {({ open }) => (
        <>
          <LayoutContainer>
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map(
                      (item) =>
                        ((user && !item.hideIfAuth) || !user) && (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                              router.pathname == item.href
                                ? "text-primary-500"
                                : "hover:text-primary-500",
                              "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ease-in-out"
                            )}
                            aria-current={
                              router.pathname == item.href ? "page" : undefined
                            }
                          >
                            {item.name}
                          </Link>
                        )
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="group p-1 transition-colors ease-in-out duration-150 focus:outline-none"
                  onClick={toggleTheme}
                >
                  <span className="sr-only">Toggle dark mode</span>
                  {theme === "dark" ? (
                    <SunIcon
                      className="h-6 w-6 group-hover:rotate-12 duration-150 transition-transform ease-in-out group-hover:fill-white"
                      aria-hidden="true"
                    />
                  ) : (
                    <MoonIcon
                      className="h-6 w-6 group-hover:rotate-12 duration-150 transition-transform ease-in-out group-hover:fill-black"
                      aria-hidden="true"
                    />
                  )}
                </button>

                {/* Profile dropdown */}
                {user && (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full text-sm focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-dark-450 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              disabled={logoutLoading}
                              onClick={handleLogout}
                              className={clsx(
                                active ? "bg-gray-100 dark:bg-dark-500" : "",
                                "block px-4 py-2 text-sm w-full text-left transition-colors ease-in-out"
                              )}
                            >
                              {t("Logout")}
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
                <div className="border-l ml-2">
                  <LanguageSelector />
                </div>
              </div>
            </div>
          </LayoutContainer>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map(
                (item) =>
                  ((user && !item.hideIfAuth) || !user) && (
                    <Disclosure.Button
                      key={item.name}
                      as={Link}
                      href={item.href}
                      className={clsx(
                        router.pathname == item.href
                          ? "text-primary-500"
                          : "hover:text-primary-500",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={
                        router.pathname == item.href ? "page" : undefined
                      }
                    >
                      {item.name}
                    </Disclosure.Button>
                  )
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const LanguageSelector = () => {
  const router = useRouter();

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <select
      className="focus:outline-none bg-transparent px-1"
      onChange={handleLanguageChange}
      defaultValue={router.locale}
    >
      <option value="en">EN</option>
      <option value="fr">FR</option>
    </select>
  );
};

Navbar.propTypes = {
  //
};

export default Navbar;
