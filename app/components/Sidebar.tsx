import React from "react";
import { NavLink } from "remix";

const NORMAL_CLASSES = "border-4 border-primary p-2 block";
const ACTIVE_CLASSES = "border-4 border-primary p-2 block bg-primary";

const Sidebar = () => {
  return (
    <aside className="relative">
      <ul className="fixed top-16 left-0 right-0 p-4 w-1/6">
        <li className="mt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? ACTIVE_CLASSES : NORMAL_CLASSES
            }
          >
            Movies
          </NavLink>
        </li>
        <li className="mt-4">
          <NavLink
            to="/person"
            className={({ isActive }) =>
              isActive ? ACTIVE_CLASSES : NORMAL_CLASSES
            }
          >
            People
          </NavLink>
        </li>
        <li className="mt-4">
          <NavLink
            to="/genres"
            className={({ isActive }) =>
              isActive ? ACTIVE_CLASSES : NORMAL_CLASSES
            }
          >
            Genres
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
