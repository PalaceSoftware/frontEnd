import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function Start() {
  return (
    <>
      <nav>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <NavLink className={({ isActive }) => "nav-link" + (isActive ? " click" : "")} to="/phaze1">시작</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
