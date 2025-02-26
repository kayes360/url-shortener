import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() { 
  return (
    <div className="d-flex gap-2 justify-content-center py-5">
    <NavLink
  to="/"
  className="btn btn-outline-primary  rounded-pill px-3" 
>
  Home
</NavLink>
      {/* <NavLink className="btn btn-outline-primary  rounded-pill px-3" type="button">
        Edit URL
      </NavLink> */}
      <NavLink
        to="/list"
        className="btn btn-outline-primary  rounded-pill px-3" 
        type="button"
      >
        URL List
      </NavLink>
    </div>
  );
}
