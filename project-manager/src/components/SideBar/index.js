import React from 'react'
import { SideBarContainer, Icon, CloseIcon, SideBarWrapper, SideBarLink, SideBarMenu, SideBtnWrap, SideBtnRoute } from './SideBarElements'

const SideBar = ({isOpen, toggle}) => {
    return (
        <SideBarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SideBarWrapper>
                <SideBarMenu>
                    <SideBarLink to="about" onClick={toggle} duration={500} exact="true" smooth={true} spy={true} offset={-80}>About</SideBarLink>
                    <SideBarLink to="discover" onClick={toggle} duration={500} exact="true" smooth={true} spy={true} offset={-80}>Discover</SideBarLink>
                    <SideBarLink to="services" onClick={toggle} duration={500} exact="true" smooth={true} spy={true} offset={-80}>Services</SideBarLink>
                    <SideBarLink to="signup" onClick={toggle} duration={500} exact="true" smooth={true} spy={true} offset={-80}>Sign Up</SideBarLink>
                </SideBarMenu>
            </SideBarWrapper>
            <SideBtnWrap>
                <SideBtnRoute to="/signin">Sign In</SideBtnRoute>
            </SideBtnWrap>
        </SideBarContainer>  
    )
}

export default SideBar
