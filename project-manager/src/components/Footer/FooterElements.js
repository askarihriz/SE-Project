import styled from "styled-components";
import {Link} from "react-scroll";

export const FooterContainer = styled.div`
    background: #101522;
`

export const FooterWrapper = styled.div`
    padding: 48px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
`

export const FooterLinkContainer = styled.div`
    display: flex;
    justify-content: center;

    @media screen and (max-width: 820px) {
        padding-top: 32px;
    }
`

export const FooterLinkWrapper = styled.div`
    display: flex;

    @media screen and (max-width: 820px) {
        flex-direction: column;
    }
`

export const FooterLinkItems = styled.div`
    display:flex;
    flex-direction: column;
    text-align: left;
    width: 120px;
    box-sizing: border-box;
    color: #fff;

    @media screen and (min-width: 1000px) {
        margin: 10px 60px;
    }

    @media screen and (max-width: 820px) {
        padding: 10px;
        width: 90%;
    }

    @media screen and (max-width: 300px) {
        padding: 10px;
        width: 100%;
    }
`

export const FooterLinkTitle = styled.h1`
    font-size: 14px;
    margin-bottom: 16px;
    margin-top: 20px;

    @media screen and (max-width: 300px) {
        font-size: 12px;
        margin-left: 20%;
    }
`

export const FooterLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    margin-bottom: 0.5rem;
    font-size: 14px;
    transition: 0.2s ease-in-out ;
    cursor: pointer;

    &:hover {
        color: #01bf71;
        transition: 0.2s ease-in-out;
    }

    @media screen and (max-width: 300px) {
        font-size: 10px;
        margin-left: 20%;
    }
`

export const SocialMedia = styled.div`
    max-width: 1000px;
    width: 100%;
`

export const SocialMediaWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1100px;
    margin: 60px auto 0 auto;

    flex-direction: column;
`

export const SocialMediaLogo = styled(Link)`
    color: #fff;
    justify-self: start;
    cursor: pointer;
    text-decoration: none;
    font-size: 1.5rem;
    align-items: center;
    margin-bottom: 16px;
    font-weight: bold;
`

export const WebsiteRights = styled.small`
    color: #fff;
    margin-bottom: 16px;
`

export const SocialIcons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 240px;
`

export const SocialIconsLink = styled.a`
    color: #fff;
    font-size: 24px;
`