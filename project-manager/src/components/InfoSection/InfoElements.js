import { Link } from "react-scroll"
import styled from "styled-components"

export const InfoContainer = styled.div`
    color: #fff;
    background: ${({LightBg}) => (LightBg ? "#f9f9f9": "#010606")};

    @media screen and (max-width: 768px) {
        padding: 100px 0;
    }
`

export const InfoWrapper = styled.div`
    display: grid;
    z-index: 1;
    height: 860px;
    width: 100%;
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 24px;
    justify-content: center;

`

export const InfoRow = styled.div`
    display: grid;
    grid-auto-columns: minmax(auto, 1fr);
    align-items: center;
    grid-template-areas: ${({ImgStart}) => (ImgStart ? `"col1 col2"` : `"col2 col1"`)};

    @media screen and (max-width: 768px) {
        grid-template-areas: ${({ImgStart}) => (ImgStart ? `"col1" "col2"`: `"col1 col1" "col2 col2"`)};
    }
`

export const Column1 = styled.div`
    margin-bottom: 15px;
    padding: 0 15px;
    grid-area: col1;
`

export const Column2 = styled.div`
    margin-bottom: 15px;
    padding: 0 15px;
    grid-area: col2;
`

export const TextWrapper = styled.div`
    max-width: 540px;
    padding-bottom: 60px;
`

export const TopLine = styled.p`
    color: #01bf71;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 700;
    line-height: 16px;
    margin-bottom: 16px;
    letter-spacing: 1.4px;

`

export const Heading = styled.h1`
    margin-bottom: 24px;
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
    color: ${({lightText}) => (lightText ? "#f7f8fa" : "#010606" )};

    @media screen and (max-width: 480px) {
        font-size: 32px;
    }
`

export const Subtitle = styled.p`
    max-width: 440px;
    margin-bottom: 34px;
    font-size: 18px;
    line-height: 24px;
    color: ${({darkText}) => (darkText ? "#010606" : "#fff" )};
`

export const BtnWrap = styled.div`
    display: flex;
    justify-content: flex-start;
`

export const ImgWrap = styled.div`
    max-width: 540px;
    height: 100%;
`

export const Img = styled.img`
    width: 100%;
    margin: 0 0 10px 0;
    padding-right: 0;
`

export const Btn = styled(Link)`
    border-radius: 50px;
    border: none;
    background: ${({Primary}) => (Primary ? "#01bf71": "#010606")};
    white-space: nowrap;
    padding: 10px 22px;
    color: ${({Primary}) => (Primary ? "#010606": "#fff")};
    font-size: 16px;
    font-weight: bold;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover{
        background: ${({Primary}) => (Primary ? "#fff": "#01bf71")};
        color: ${({Primary}) => (Primary ? "#010606": "#fff")};
        transition: all 0.2s ease-in-out;
    }
`