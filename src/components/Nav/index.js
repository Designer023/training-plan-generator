import React, { useState } from "react";
import {
  A,
  Nav,
  NavbarBrand,
  NavItem,
  NavLink,
  NavDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "@bootstrap-styled/v4";

import { Link } from "react-router-dom";

const NavMenu = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Nav inline={true} className=" navbar-dark bg-dark">
      <NavItem>
        <NavbarBrand className="text-light" tag={Link} to="/">
          Training plan generator
        </NavbarBrand>
      </NavItem>

      <NavDropdown isOpen={isOpen} toggle={() => setOpen(!isOpen)}>
        <DropdownToggle caret nav>
          Plans
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <NavLink tag={Link} to={"/"}>
              Plan
            </NavLink>
          </DropdownItem>
        </DropdownMenu>
      </NavDropdown>
    </Nav>
  );
};

export default NavMenu;
