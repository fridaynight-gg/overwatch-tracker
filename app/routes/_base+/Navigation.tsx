import { Form, Link, Outlet, useLocation } from '@remix-run/react';
import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import overwatch_logo from '~/images/overwatch_logo.svg';
import { Button } from '~/components/Button';

type NavigationItem = {
  name: string;
  href: string;
  icon: ({ className }: { className: string }) => JSX.Element;
  isCurrent: (pathname: string) => boolean;
};

const sidebarNavigation: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: ({ className }: { className: string }) => (
      <motion.div
        layoutId="today-icon"
        className={clsx(
          'relative flex h-6 w-6 items-center justify-center',
          className
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="currentColor"
          className={clsx('h-6 w-6')}
        >
          <path d="M112 0C120.8 0 128 7.164 128 16V64H320V16C320 7.164 327.2 0 336 0C344.8 0 352 7.164 352 16V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H96V16C96 7.164 103.2 0 112 0zM416 192H32V448C32 465.7 46.33 480 64 480H384C401.7 480 416 465.7 416 448V192zM384 96H64C46.33 96 32 110.3 32 128V160H416V128C416 110.3 401.7 96 384 96z" />
        </svg>
        <span className="absolute top-2 text-xs text-current">
          {new Date().getDate()}
        </span>
      </motion.div>
    ),
    isCurrent: (pathname: string) => pathname === '/dashboard',
  },
  {
    name: 'Matches',
    href: '/matches',
    icon: ({ className }: { className: string }) => (
      <motion.div
        layoutId="path-icon"
        className={clsx(
          'relative flex h-6 w-6 items-center justify-center',
          className
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
          className={clsx('h-6 w-6')}
        >
          <path d="M440 96C440 109.3 429.3 120 416 120C402.7 120 392 109.3 392 96C392 82.75 402.7 72 416 72C429.3 72 440 82.75 440 96zM416 256H336C309.5 256 288 277.5 288 304C288 330.5 309.5 352 336 352H432C476.2 352 512 387.8 512 432C512 476.2 476.2 512 432 512H139.6C147.3 503.2 156.5 492.3 165.1 480H432C458.5 480 480 458.5 480 432C480 405.5 458.5 384 432 384H336C291.8 384 255.1 348.2 255.1 304C255.1 259.8 291.8 224 336 224H387.1C358.8 190.3 320 136.7 320 96C320 42.98 362.1 0 416 0C469 0 512 42.98 512 96C512 140.3 466 199.9 437.7 232.4C425.1 246.9 416 256 416 256zM468.4 133.7C476.5 117.5 480 104.7 480 96C480 60.65 451.3 32 416 32C380.7 32 352 60.65 352 96C352 104.7 355.5 117.5 363.6 133.7C371.5 149.4 382.2 165.7 393.6 180.8C401.3 191.1 409.1 200.6 416 208.6C422.9 200.6 430.7 191.1 438.4 180.8C449.8 165.7 460.5 149.4 468.4 133.7zM71.1 352C71.1 338.7 82.74 328 95.1 328C109.3 328 119.1 338.7 119.1 352C119.1 365.3 109.3 376 95.1 376C82.74 376 71.1 365.3 71.1 352zM117.7 488.4C115.7 490.7 113.8 492.8 112.1 494.8L112 494.8C102.5 505.5 96 512 96 512C96 512 86.9 502.9 74.3 488.4C45.98 455.9 0 396.3 0 352C0 298.1 42.98 256 96 256C149 256 192 298.1 192 352C192 392.8 152.9 446.7 124.6 480.4C122.2 483.2 119.9 485.9 117.7 488.4L117.7 488.4zM148.4 389.7C156.5 373.5 159.1 360.7 159.1 352C159.1 316.7 131.3 288 95.1 288C60.65 288 31.1 316.7 31.1 352C31.1 360.7 35.53 373.5 43.62 389.7C51.46 405.4 62.25 421.7 73.6 436.8C81.34 447.1 89.11 456.6 95.1 464.6C102.9 456.6 110.7 447.1 118.4 436.8C129.7 421.7 140.5 405.4 148.4 389.7z" />
        </svg>
      </motion.div>
    ),
    isCurrent: (pathname: string) => pathname === '/matches',
  },
];

const userNavigation = [
  { name: 'Account', href: '/account' },
  { name: 'Logout', href: '/logout' },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export function Navigation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src={overwatch_logo}
                      alt="Overwatch Tracker"
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      {sidebarNavigation.map((item) => (
                        // eslint-disable-next-line jsx-a11y/anchor-has-content
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.isCurrent(location.pathname)
                              ? 'bg-gray-100 text-gray-900'
                              : 'group flex items-center rounded-md px-2 py-2 text-base font-medium'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.isCurrent(location.pathname)
                                ? 'text-gray-500'
                                : 'text-gray-400 group-hover:text-gray-500',
                              'mr-4 h-6 w-6 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                className="h-8 w-auto"
                src={overwatch_logo}
                alt="Overwatch Tracker"
              />
            </div>
            <div className="mt-5 flex flex-grow flex-col">
              <nav className="flex-1 space-y-1 px-2 pb-4">
                {sidebarNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.isCurrent(location.pathname)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.isCurrent(location.pathname)
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 h-6 w-6 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1">
                <Form className="flex w-full lg:ml-0" action="#" method="get">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <MagnifyingGlassIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search-field"
                      className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </Form>
              </div>
              <div className="ml-4 flex items-center lg:ml-6">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://static.wikia.nocookie.net/overwatch_gamepedia/images/b/bc/PI_Pachiversary.png"
                        alt="Account Avatar"
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Form
                              action={item.href}
                              method="post"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              <button type="submit">{item.name}</button>
                            </Form>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {location.pathname.charAt(1).toUpperCase() +
                    location.pathname.slice(2)}
                </h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Your content */}
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
