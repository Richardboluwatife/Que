// eslint-disable-next-line no-unused-vars
import React from "react";
import { NavLink } from "react-router-dom";
import Company from '../assets/COM.png'
import Staff from '../assets/Staff.jpg'
import Ticket from '../assets/ticket.jpg'
import { signOutUser } from "../utils/firebase/firebase";
import { LogOut } from "lucide-react";

// Define the type for the NavLink component props
interface NavLinkProps {
    to: string;
    isActive: boolean;
}

function Sidebar() {

    const handleSignOut = async () => {
        await signOutUser();
      }
    return (
        <div className="sidebar bg-blue-300 text-white h-[40rem] w-32 shadow-lg rounded-r-[100px] ml-7 pt-20  mt-5">
            <ul className="flex flex-col items-center gap-20 pt-5">
                <li>
                    <NavLink
                        to="/company"
                        className={({ isActive }: NavLinkProps) =>
                            `group hover:bg-red-200 w-16 h-16 flex items-center justify-center rounded-full transition bg-gray-300 ${isActive ? "bg-red-400" : ""
                            }`
                        }
                        end
                    >
                        <img className="w-14 h-14 rounded-full" src={ Company } alt="Dashboard" />
                        <span className="hidden group-hover:block absolute bg-gray-900 opacity-50 text-white text-center rounded px-2 py-1 transform -translate-x-1/2 z-10">
                            Company
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/staff"
                        className={({ isActive }: NavLinkProps) =>
                            `group hover:bg-red-200 w-16 h-16 flex items-center justify-center rounded-full transition bg-gray-300 ${isActive ? "bg-red-400" : ""
                            }`
                        }
                    >
                        <img className="w-14 h-14 rounded-full" src={ Staff } alt="Real Estate" />
                        <span className="hidden group-hover:block absolute bg-gray-900 opacity-50 text-white text-center rounded px-2 py-1 transform -translate-x-1/2 z-10">
                            Staff
                        </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin-ticket-table"
                        className={({ isActive }: NavLinkProps) =>
                            `group hover:bg-red-200 w-16 h-16 flex items-center justify-center rounded-full transition bg-gray-300 ${isActive ? "bg-red-400" : ""
                            }`
                        }
                    >
                        <img className="w-14 h-14 rounded-full" src={ Ticket } alt="Invoices" />
                        <span className="hidden group-hover:block absolute bg-gray-900 opacity-50 text-white text-center rounded px-2 py-1 transform -translate-x-1/2 z-10">
                            Ticket
                        </span>
                    </NavLink>
                </li>

                <li onClick={handleSignOut}>
                    <NavLink
                        to="/signin"
                        className={({ isActive }: NavLinkProps) =>
                            `group hover:bg-red-200 w-16 h-16 flex items-center justify-center rounded-full transition bg-gray-300 ${isActive ? "bg-red-400" : ""
                            }`
                        }
                    >
                        
                        <LogOut />
                        <span className="hidden group-hover:block absolute bg-gray-900 opacity-50 text-white text-center rounded px-2 py-1 transform -translate-x-1/2 z-10">
                            Log Out
                        </span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
