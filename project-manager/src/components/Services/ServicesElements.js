import styled from "styled-components";

export const ServicesContainer = styled.div`
    background: #010606;
    color: #fff;
    height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    @media screen and (max-width: 768px) {
        padding: 0 10px;
        height: 1300px;
    }

    @media screen and (max-width: 480px) {
        padding: 0 10px;
        height: 1300px;
    }
`

export const ServicesWrapper = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    grid-gap: 16px;
    padding: 0 50px;

    @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: 0 20px;
    }
`

export const ServicesCard = styled.div`
    display: flex;
    background: #fff;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 10px;
    max-height: 340px;
    align-items: center;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    padding: 30px;

    &:hover {
        transform: scale(1.02);
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }
`

export const ServicesImg = styled.img`
    height: 160px;
    width: 160px;
    margin-bottom: 10px;
`


export const ServiceHeading = styled.h1`
    font-size: 48px;
    color: #fff;
    margin-bottom: 100px;

    @media screen and (max-width: 480px) {
        font-size: 2rem;
    }
`

export const ServicesH2 = styled.h2`
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #010606;
`

export const ServicesP = styled.p`
    font-size: 1rem;
    text-align: center;
    color: #010606;
`