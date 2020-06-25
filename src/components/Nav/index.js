import React, { useState } from "react";
import {
  A,
  Nav,
  NavbarBrand,
  NavItem,
  NavLink,
  NavbarToggler,
  NavDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "@bootstrap-styled/v4";

import { Link } from "react-router-dom";

const NavMenu = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Nav inline={true} className=" navbar-dark bg-dark">
      <NavItem>
        <NavbarBrand tag={A} to="/">
          Training plan generator
        </NavbarBrand>
      </NavItem>

      <NavDropdown isOpen={isOpen} toggle={() => setOpen(!isOpen)}>
        <DropdownToggle caret nav>
          Plans
        </DropdownToggle>
        <DropdownMenu>
          <NavItem>
            <NavLink tag={Link}>Plan</NavLink>
          </NavItem>
        </DropdownMenu>
      </NavDropdown>
    </Nav>
  );
};

export default NavMenu;
