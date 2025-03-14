import {Link, NavLink} from 'react-router-dom'

export default function Header() {
    return (
        <header className=" sticky z-50 top-0">
            <nav className="bg-white px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://ltce.in/img_ltce/logo-b.png"
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                    </Link>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                to="/"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-black-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/about"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-black-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                            <div className="relative group">
                             <NavLink
                                      className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-black-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Faculty
                                </NavLink>
                                <ul className="absolute left-0 mt-2 w-48 bg-white  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                                    <li>
                                    <NavLink
                                        to="/HodDesk"
                                        className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-black-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                        }
                                    >
                                        HOD Desk
                                    </NavLink>
                                    <NavLink
                                        to="/Teaching"
                                        className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-black-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                        }
                                    >
                                        Teaching Staff
                                    </NavLink>
                                    </li>
                                    <li>
                                    <NavLink
                                        to="/NonTeaching"
                                        className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-black-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                        }
                                    >
                                        Non-Teaching Staff
                                    </NavLink>
                                    </li>
                                </ul>
                                </div>
                            </li>
                            <li>
                                <NavLink
                                to="/Club"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-black-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Clubs
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/Event"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-black-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Events
                                </NavLink>
                            </li>
                            
                            <li>
                                <NavLink
                                to="/Academics"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-black-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Academics
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/Placements"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-black-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                Placements & Career Opportunities
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/Contact"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-black-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Contact us
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}