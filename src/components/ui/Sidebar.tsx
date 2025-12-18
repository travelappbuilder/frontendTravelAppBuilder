import React from "react";
import { NavLink } from "react-router-dom";

interface Link {
  to: string;
  label: string;
}

const links: Link[] = [
  { to: "/dashboard/admin", label: "Admin" },
  { to: "/dashboard/user", label: "User" },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-50 min-h-screen p-4">
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded hover:bg-gray-200 ${isActive ? "bg-gray-200 font-bold" : ""}`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};
