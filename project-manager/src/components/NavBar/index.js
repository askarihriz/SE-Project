import React, { useState, useEffect } from "react";
import {
  Nav,
  NavContainer,
  NavLogo,
  NavMenu,
  NavItems,
  NavLinks,
  MobileIcons,
  NavBtn,
  NavBtnLink,
} from "./NavBarElements";
import { FaBars } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";

const NavBar = ({ toggle }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const onScroll = () => {
    if (window.scrollY >= 80) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <Nav isScrolling={isScrolling}>
        <NavContainer>
          <NavLogo to="/" onClick={toggleHome}>
            Projo
          </NavLogo>
          <MobileIcons onClick={toggle}>
            <FaBars />
          </MobileIcons>
          <NavMenu>
            <NavItems>
              <NavLinks
                to="about"
                duration={500}
                exact="true"
                smooth={true}
                spy={true}
                offset={-80}
              >
                About
              </NavLinks>
            </NavItems>
            <NavItems>
              <NavLinks
                to="discover"
                duration={500}
                exact="true"
                smooth={true}
                spy={true}
                offset={-80}
              >
                Discover
              </NavLinks>
            </NavItems>
            <NavItems>
              <NavLinks
                to="services"
                duration={500}
                exact="true"
                smooth={true}
                spy={true}
                offset={-80}
              >
                Services
              </NavLinks>
            </NavItems>
            <NavItems>
              <NavLinks
                to="signup"
                duration={500}
                exact="true"
                smooth={true}
                spy={true}
                offset={-80}
              >
                Sign Up
              </NavLinks>
            </NavItems>
          </NavMenu>
          <NavBtn>
            <NavBtnLink to="/signin">Sign In</NavBtnLink>
          </NavBtn>
        </NavContainer>
      </Nav>
    </>
  );
};

export default NavBar;
